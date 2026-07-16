# Docker setup for Fluxo (Calendar APP)

## Quick Start

### Development (recommended for testing)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
```

### Production (work in progress)

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

## Services

- `app`: NestJS application
- `db`: PostgreSQL database

## Main commands

- `docker compose down`
- `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d`
- `docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d`
- `docker compose ps`
- `docker compose logs --no-log-prefix app --tail=50`
- `docker compose logs --no-log-prefix app --follow`

## PostgreSQL connection

- Host: `localhost`
- Port: `5432`
- User: `postgres`
- Password: `admin`
- Development database: `calendar_dev`
- Production database: `calendar_prod`

## Custom Docker configuration

- `docker-compose.yml` is the common base file.
- `docker-compose.dev.yml` and `docker-compose.prod.yml` extend that base.
- App dev container name: `nestjs_calendar_app_app_dev`
- DB dev container name: `nestjs_calendar_app_db_dev`
- App prod container name: `nestjs_calendar_app_app_prod`
- DB prod container name: `nestjs_calendar_app_db_prod`
- Dev volume: `nestjs_calendar_app_postgres_dev_data`
- Prod volume: `nestjs_calendar_app_postgres_prod_data`
- Custom network: `nestjs_calendar_app_network`

## How to see the app console

- Live logs:
  ```bash
  docker compose logs --no-log-prefix --follow app
  ```
- Open a shell inside the container:
  ```bash
  docker compose exec app sh
  ```
- To inspect Node errors, check the Docker logs or the direct output from `docker compose logs`.

## Technical notes about the project

- The project uses `nestjs-i18n` with:
  ```ts
  path: path.join(__dirname, 'i18n')
  ```
- `tsconfig.json` outputs files to `./dist`.
- `nest-cli.json` copies the `i18n/**/*` assets to `dist`, which is required for translation loading.
- To avoid i18n path failures, the container builds the project before running the compiled package.

## Conflict avoidance tips

- Run these files from the project folder.
- Container names and the custom network prevent collisions with other projects.
- Use `docker compose down` before changing `.env` or `docker-compose*.yml` to restart containers cleanly.
