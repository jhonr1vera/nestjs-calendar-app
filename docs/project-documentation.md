# Internal Integration Documentation

This document provides an overview of the configuration, structure, and key services of the project.

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Mail Service](#mail-service)
3. [Directory Structure](#directory-structure)
4. [Development Environment Setup](#development-environment-setup)
5. [Difference between .env environments](#difference-between-env-environments)

---

## <a name="environment-variables"></a>1. Environment Variables

Environment variables are configured using `.env` files. Below are the main variables (based on `.env.test`):

**API & Environment**

- `PORT`: Port where the application runs.
- `ENVIRONMENT`: Execution environment (e.g., `development`, `production`).

**Database**

- `DATABASE_HOST`: Database host (e.g., `localhost`).
- `DATABASE_PORT`: Database port (e.g., `5432`).
- `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_NAME`: Credentials and DB name.

**Authentication**

- `JWT_SECRET`: Secret for signing JWT tokens.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`: Configuration for OAuth with Google.

**Mailer (ReSend)**

- `EMAIL_HOST`, `EMAIL_PORT`: SMTP Server.
- `EMAIL_USER`, `EMAIL_PASS`: SMTP Credentials.
- `EMAIL_FROM`: Sender address.

---

## <a name="mail-service"></a>2. Mail Service

The `MailService` handles sending transactional emails (welcome, reminders, etc.).

- **Flow**: Uses `@nestjs-modules/mailer` with `nodemailer` under the hood.
- **Templates**: Templates are rendered using `Handlebars` and support internationalization (i18n). They are dynamically selected based on the user's language (`locale`).
- **Error Handling**: Sending failures are caught and logged to avoid interrupting the main application flow.

---

## <a name="directory-structure"></a>3. Directory Structure

The source code is located in `src/` and follows a NestJS modular architecture.

- **`src/<module>/`**: Each main feature has its own directory (e.g., `users`, `auth`, `reminders`).
  - **`*.module.ts`**: Defines the module and its dependencies.
  - **`*.controller.ts`**: Handles HTTP routes and validates input.
  - **`*.service.ts`**: Contains business logic.
  - **`entities/`**: Defines database models (TypeORM Entities). Example: `users/entities/user.entity.ts`.
  - **`dto/`**: Data Transfer Objects for validating input/output data.

---

## <a name="development-environment-setup"></a>4. Development Environment Setup

Follow these steps to set up the project locally after defining the environment variables in the `.env` file:

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Configure environment variables**:
    Copy the example file (if it exists) or create a `.env` file based on the [Environment Variables](#environment-variables) section.

3.  **Generate migrations**:
    Generate a new migration file based on the difference between the entities and the database schema.

    ```bash
    npm run migration:generate -- src/database/migrations/ChangeName
    ```

    Otherwise, you can define `ENVIRONMENT=development` in the .env file to automatically update the database schema.

4.  **Run migrations**:
    Apply the migrations to the database.

    ```bash
    npm run migration:run
    ```

5.  **Seed the database**:
    Inserts necessary initial data (roles, admin users, etc.).

    ```bash
    npm run seed:run
    ```

6.  **Start the server**:
    Development mode with hot reload ("watch").
    ```bash
    npm run start:dev
    ```

## <a name="difference-between-env-environments"></a>5. Difference between .env environments

The .env file has three different environments:

- `development`: Development environment.
- `test`: Test environment.
- `production`: Production environment.

| Environment | Database | Mailer |
| ----------- | -------- | ------ |
| development | Cell 2   | Cell 3 |
| test        | Cell 5   | Cell 6 |
| production  | Cell 8   | Cell 9 |
