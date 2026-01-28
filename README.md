# Calendar NestJS MVC

## Description

Fluxo is a calendar application(API) developed with NestJS. The purpose of this application is to provide you with a space where you can centrally organise all your plans within your preferred time frame.

## Features

- Event registration.
- Registration of as many reminders as there are per event (which will be sent via email).
- A dashboard for users and administrators, who will have different management features.

## Requirements

- Node +20 (Developed in version 22.19.0)
- NestJS
- PostgreSQL +17.6

## Project setup

#### Step 1. Install the project dependencies

```bash
$ npm install
```

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

### Optional steps:

#### Step 5: If you want to enable Google login

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

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
