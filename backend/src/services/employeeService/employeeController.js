'use strict';

const { Employee, Skill, Certification, sequelize } = require('../../models');
const { generateLoginId } = require('../authService/idGenerator');
const { Op } = require('sequelize');
const { generateFirstTimePassword, hashPassword } = require('../authService/passwordHelper');

/**
 * Creates a new employee. Only Admin can access this.
 * Auto-generates Login ID and first-time password.
 */
async function createEmployee(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const {
      first_name, last_name, email, date_of_joining, role
    } = req.body;

    if (!first_name || !last_name || !email || !date_of_joining) {
      await t.rollback();
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Missing required identity fields.' }
      });
    }

    // Check if email already exists
    const existing = await Employee.findOne({ where: { email }, transaction: t });
    if (existing) {
      await t.rollback();
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Email already exists.' }
      });
    }

    const login_id = await generateLoginId(first_name, last_name, date_of_joining);
    const plainPassword = generateFirstTimePassword();
    const password_hash = await hashPassword(plainPassword);

    const newEmployee = await Employee.create({
      ...req.body,
      login_id,
      password_hash,
      role: role || 'employee',
      first_name,
      last_name,
      email,
      date_of_joining
    }, { transaction: t });

    await t.commit();

    // Return the plain password ONLY ONCE so the admin can share it
    return res.status(201).json({
      message: 'Employee created successfully',
      employee: {
        id: newEmployee.id,
        login_id: newEmployee.login_id,
        first_name: newEmployee.first_name,
        last_name: newEmployee.last_name,
        email: newEmployee.email,
        role: newEmployee.role
      },
      credentials: {
        login_id: newEmployee.login_id,
        password: plainPassword
      }
    });

  } catch (error) {
    await t.rollback();
    next(error);
  }
}

}

/**
 * Lists employees with optional search.
 * Includes a stubbed status field.
 */
async function getEmployees(req, res, next) {
  try {
    const { search } = req.query;
    
    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { first_name: { [Op.like]: `%${search}%` } },
          { last_name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const employees = await Employee.findAll({
      where: whereClause,
      attributes: [
        'id', 'login_id', 'first_name', 'last_name', 'email', 
        'role', 'department', 'job_position', 'company'
      ],
      order: [['created_at', 'DESC']]
    });

    // Stub status as 'present' for now
    const enriched = employees.map(emp => ({
      ...emp.toJSON(),
      status: 'present'
    }));

    return res.status(200).json(enriched);
  } catch (error) {
    next(error);
  }
}

}

/**
 * Get an employee profile by ID.
 * Rules: Admin sees all. Self sees all. Other employees see non-sensitive subset.
 */
async function getEmployeeById(req, res, next) {
  try {
    const { id } = req.params;
    const reqUser = req.user; // from authGuard
    
    const employee = await Employee.findByPk(id, {
      include: [
        { model: Skill, as: 'skills' },
        { model: Certification, as: 'certifications' }
      ]
    });

    if (!employee) {
      return res.status(404).json({ error: { message: 'Employee not found' } });
    }

    const isSelf = reqUser.id === parseInt(id, 10);
    const isAdmin = reqUser.role === 'admin';

    let data = employee.toJSON();
    delete data.password_hash; // never return password hash

    if (!isSelf && !isAdmin) {
      // Read-only, non-sensitive view for peers
      const publicData = {
        id: data.id,
        login_id: data.login_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        company: data.company,
        department: data.department,
        job_position: data.job_position,
        about: data.about,
        job_love_text: data.job_love_text,
        hobbies_text: data.hobbies_text,
        skills: data.skills,
        certifications: data.certifications,
        profile_picture_url: data.profile_picture_url
      };
      return res.status(200).json(publicData);
    }

    // Full access for self or admin
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * Update an employee profile by ID.
 * Rules: Admin can update all (except salary fields which are separated). 
 * Self can update basic info only.
 */
async function updateEmployeeById(req, res, next) {
  try {
    const { id } = req.params;
    const reqUser = req.user;
    
    const employee = await Employee.findByPk(id);
    if (!employee) return res.status(404).json({ error: { message: 'Employee not found' } });

    const isSelf = reqUser.id === parseInt(id, 10);
    const isAdmin = reqUser.role === 'admin';

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ error: { message: 'Forbidden to edit another employee profile' } });
    }

    let updateData = {};
    if (isAdmin) {
      // Admin can update almost everything
      updateData = { ...req.body };
      // Prevent accidental role or login ID changes here if necessary, but assuming full trust for Phase 5
      delete updateData.id;
      delete updateData.password_hash; 
    } else if (isSelf) {
      // Employee can only update non-sensitive resume/private fields (like address, hobbies, about)
      const allowedSelfFields = [
        'about', 'job_love_text', 'hobbies_text', 'personal_email', 'mobile',
        'gender', 'marital_status', 'nationality', 'residing_address',
        'bank_name', 'account_number', 'ifsc_code', 'profile_picture_url'
      ];
      for (const field of allowedSelfFields) {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      }
    }

    await employee.update(updateData);
    
    return res.status(200).json({ message: 'Profile updated successfully', employee });
  } catch (error) {
    next(error);
  }
}

// Skills and Certs
async function addSkill(req, res, next) {
  try {
    const { id } = req.params;
    const { skill_name } = req.body;
    if (req.user.id !== parseInt(id, 10) && req.user.role !== 'admin') {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }
    const skill = await Skill.create({ employee_id: id, skill_name });
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
}

async function deleteSkill(req, res, next) {
  try {
    const { id, skillId } = req.params;
    if (req.user.id !== parseInt(id, 10) && req.user.role !== 'admin') {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }
    await Skill.destroy({ where: { id: skillId, employee_id: id } });
    res.status(200).json({ message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
}

async function addCertification(req, res, next) {
  try {
    const { id } = req.params;
    const { certification_name } = req.body;
    if (req.user.id !== parseInt(id, 10) && req.user.role !== 'admin') {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }
    const cert = await Certification.create({ employee_id: id, certification_name });
    res.status(201).json(cert);
  } catch (error) {
    next(error);
  }
}

async function deleteCertification(req, res, next) {
  try {
    const { id, certId } = req.params;
    if (req.user.id !== parseInt(id, 10) && req.user.role !== 'admin') {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }
    await Certification.destroy({ where: { id: certId, employee_id: id } });
    res.status(200).json({ message: 'Certification deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
  addSkill,
  deleteSkill,
  addCertification,
  deleteCertification
};
