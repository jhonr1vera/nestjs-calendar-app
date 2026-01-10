# Database Migrations (TypeORM)

In this project, we use TypeORM to manage these migrations. The typical workflow consists of modifying your entities (`.entity.ts`), generating an automatic migration that reflects those changes, and then executing it to apply the modifications to the PostgreSQL database.

## Available Commands

Below are the scripts configured in `package.json` to manage the migration lifecycle:

### 1. Create Empty Migration

Creates a migration file with a basic structure. Useful when you need to write SQL manually or perform complex data operations.

```bash
npm run migration:create -- src/database/migrations/MigrationName
```

### 2. Generate Automatic Migration

Compares your current entities with the database schema and automatically generates the necessary SQL changes.

```bash
npm run migration:generate -- src/database/migrations/ChangeName
```

### 3. Run Migrations

Applies all pending migrations that have not yet been executed in the database.

```bash
npm run migration:run
```

### 4. Revert Migration

Undoes (reverts) the last executed migration. Useful for fixing errors during development.

```bash
npm run migration:revert
```

### 5. Show Status

Shows a list of all migrations and their current status (executed or pending).

```bash
npm run migration:show
```
