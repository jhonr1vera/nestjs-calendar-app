# Calendar NestJS MVC

## Description

Fluxo is a calendar application(API) developed with NestJS. The purpose of this application is to provide you with a space where you can centrally organise all your plans within your preferred time frame.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Requirements](#requirements)
- [Project setup](#project-setup)
   - [Docker Guide](./docs/docker.md)
- [Compile and run the project](#compile-and-run-the-project)
- [Run tests](#run-tests)

## Features

- Event registration.
- Registration of as many reminders as there are per event (which will be sent via email).
- A dashboard for users and administrators, who will have different management features.

## Requirements

- Node +20 (Developed in version 22.19.0)
- PostgreSQL +17.6
Also, you can use instead:
- Docker

## Project setup

#### Step 1. Install the project dependencies

```bash
$ npm install
```

> Use this command in case you have Node and Postgres installed locally. If you choose the docker tool route use the [Docker Guide](./docs/docker.md) then continue with the following steps.

#### Step 2: Create a Postgres database without making any additional changes.

#### Step 3: Assign a value to the following environment variables

```bash
# API
PORT=

# Environment (Options: development, production, test)
ENVIRONMENT=

# Database
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=

# Auth
JWT_SECRET =
```

#### Step 4: Run the following command to seed basic information in database

```bash
$ npm run seed:run
```

#### Step 5: To enable Google login

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new **Project**.
3. Navigate to **APIs & Services > Credentials**.
4. Click on **Create Credentials** and select **OAuth client ID**.
5. You may need to configure the **OAuth consent screen** first if you haven't done so.
6. Create the client (Application type: Web application).
7. Once created, copy the **Client ID** and **Client Secret**.
8. Update your `.env` file with these values:
   ```bash
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google-login/callback
   ```

### Optional step:

#### Step 6: If you want to enable email notifications (reminder functionality)

1. Create an account at [Resend](https://resend.com/).
2. Generate a new **API Key**.
3. Update your `.env` file with the following configuration (using the standard Resend testing sender):
   ```bash
   # Mailer (ReSend)
   EMAIL_HOST=smtp.resend.com
   EMAIL_PORT=465
   EMAIL_USER=resend
   EMAIL_PASS=your_resend_api_key
   EMAIL_FROM=onboarding@resend.dev
   ```

## Technical notes about the project

- The project uses `nestjs-i18n` with:
  ```ts
  path: path.join(__dirname, 'i18n')
  ```
- `tsconfig.json` outputs files to `./dist`.
- `nest-cli.json` copies the `i18n/**/*` assets to `dist`, which is required for translation loading.
- To avoid i18n path failures, the container builds the project before running the compiled package.

## Run tests (WIP)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 🚧 Incoming Changes

- Administrator dashboard.
- Email for event registration.
- Profile Details Section
