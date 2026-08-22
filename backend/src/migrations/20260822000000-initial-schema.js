'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      login_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      personal_email: {
        type: Sequelize.STRING(150),
      },
      mobile: {
        type: Sequelize.STRING(20),
      },
      company: {
        type: Sequelize.STRING(100),
      },
      department: {
        type: Sequelize.STRING(100),
      },
      manager: {
        type: Sequelize.STRING(100),
      },
      location: {
        type: Sequelize.STRING(100),
      },
      role: {
        type: Sequelize.ENUM('admin', 'employee'),
        allowNull: false,
        defaultValue: 'employee',
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
      },
      gender: {
        type: Sequelize.STRING(20),
      },
      nationality: {
        type: Sequelize.STRING(50),
      },
      marital_status: {
        type: Sequelize.STRING(20),
      },
      residing_address: {
        type: Sequelize.TEXT,
      },
      bank_name: {
        type: Sequelize.STRING(100),
      },
      account_number: {
        type: Sequelize.STRING(50),
      },
      ifsc_code: {
        type: Sequelize.STRING(20),
      },
      pan_no: {
        type: Sequelize.STRING(20),
      },
      uan_no: {
        type: Sequelize.STRING(20),
      },
      date_of_joining: {
        type: Sequelize.DATEONLY,
      },
      job_position: {
        type: Sequelize.STRING(100),
      },
      emp_code: {
        type: Sequelize.STRING(50),
      },
      about: {
        type: Sequelize.TEXT,
      },
      job_love_text: {
        type: Sequelize.TEXT,
      },
      hobbies_text: {
        type: Sequelize.TEXT,
      },
      profile_picture_url: {
        type: Sequelize.STRING(255),
      },
      company_logo_url: {
        type: Sequelize.STRING(255),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('skills', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      skill_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('certifications', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      certification_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('salary_profiles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      wage_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      wage_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      working_days_per_week: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      basic_salary: {
        type: Sequelize.DECIMAL(12, 2),
      },
      hra: {
        type: Sequelize.DECIMAL(12, 2),
      },
      standard_allowance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      performance_bonus: {
        type: Sequelize.DECIMAL(12, 2),
      },
      leave_travel_allowance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      fixed_allowance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      professional_tax: {
        type: Sequelize.DECIMAL(12, 2),
      },
      pf_employee_contribution: {
        type: Sequelize.DECIMAL(12, 2),
      },
      pf_employer_contribution: {
        type: Sequelize.DECIMAL(12, 2),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('attendance_records', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      check_in_time: {
        type: Sequelize.DATE,
      },
      check_out_time: {
        type: Sequelize.DATE,
      },
      work_hours: {
        type: Sequelize.DECIMAL(5, 2),
      },
      extra_hours: {
        type: Sequelize.DECIMAL(5, 2),
      },
      break_time: {
        type: Sequelize.DECIMAL(5, 2),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('attendance_records', ['employee_id', 'date'], {
      unique: true,
      name: 'idx_emp_date'
    });

    await queryInterface.createTable('time_off_requests', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('Paid Time Off', 'Sick Leave', 'Unpaid Leaves'),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      allocation_days: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      attachment_url: {
        type: Sequelize.STRING(255),
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('leave_allocations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      allocated_days: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      remaining_days: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leave_allocations');
    await queryInterface.dropTable('time_off_requests');
    await queryInterface.dropTable('attendance_records');
    await queryInterface.dropTable('salary_profiles');
    await queryInterface.dropTable('certifications');
    await queryInterface.dropTable('skills');
    await queryInterface.dropTable('employees');
  }
};
