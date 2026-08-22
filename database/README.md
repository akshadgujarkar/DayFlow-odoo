# database/

This directory holds the MySQL schema artifacts.

| File | Description |
|------|-------------|
| `hrms_schema.mwb` | MySQL Workbench model (designed in Phase 1) |
| `hrms_schema.sql` | Forward-engineered DDL exported from Workbench (Phase 1) |

## Workflow

1. **Design** the schema in MySQL Workbench (`hrms_schema.mwb`).
2. **Forward-engineer** to produce `hrms_schema.sql`.
3. **Generate** Sequelize models and migrations from the exported DDL (Phase 1).
4. **Apply** via `npx sequelize-cli db:migrate` against a clean dev database.

> This directory is intentionally empty in Phase 0.
> Schema files will be added in Phase 1 (Database Schema Design).
