# TypeORM Integration Guide

This document explains the basic TypeORM integration implemented in the Connect Flow project.

## Overview

TypeORM has been integrated into this NestJS application to provide Object-Relational Mapping (ORM) capabilities for database operations. The integration follows NestJS best practices using the **custom provider pattern** rather than the `@nestjs/typeorm` package.

## Installation

The following packages were installed:

```bash
npm install typeorm mysql2
```

- **typeorm**: The ORM library
- **mysql2**: MySQL database driver

## Architecture

The TypeORM integration consists of three main layers:

### 1. Database Layer (`src/database/`)

#### Database Providers ([database.providers.ts](file:///c:/Users/jhonb/dev/connect-flow/src/database/database.providers.ts))

Creates and configures the TypeORM `DataSource` connection:

```typescript
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
```

**Key Configuration:**

- Uses environment variables for database credentials
- Auto-discovers entity files matching the pattern `**/entities/*.entity{.ts,.js}`
- `synchronize: true` automatically syncs database schema (⚠️ disable in production)

#### Database Module ([database.module.ts](file:///c:/Users/jhonb/dev/connect-flow/src/database/database.module.ts))

Exports the database providers for use in other modules:

```typescript
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
```

### 2. Entity Layer

#### User Entity ([user.entity.ts](file:///c:/Users/jhonb/dev/connect-flow/src/users/entities/user.entity.ts))

Defines the database table structure using TypeORM decorators:

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
```

**Decorators Used:**

- `@Entity()`: Marks the class as a database table
- `@PrimaryGeneratedColumn()`: Auto-incrementing primary key
- `@Column()`: Regular table column

#### Repository Provider ([user.providers.ts](file:///c:/Users/jhonb/dev/connect-flow/src/users/entities/user.providers.ts))

Creates a repository instance for the User entity:

```typescript
export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
```

This provider:

- Injects the `DATA_SOURCE`
- Creates a TypeORM repository for the `User` entity
- Makes it available as `USER_REPOSITORY` token

### 3. Module Integration

#### Users Module ([users.module.ts](file:///c:/Users/jhonb/dev/connect-flow/src/users/users.module.ts))

Imports the database module and provides the repository:

```typescript
@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
})
export class UsersModule {}
```

#### Users Service ([users.service.ts](file:///c:/Users/jhonb/dev/connect-flow/src/users/users.service.ts))

Injects and uses the repository:

```typescript
@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  // Other methods...
}
```

**Key Points:**

- Uses `@Inject()` decorator with the repository token
- Repository provides TypeORM methods like `find()`, `findOne()`, `save()`, `update()`, `delete()`

## Usage Pattern

To add TypeORM to a new module:

1. **Create an entity** in `src/[module]/entities/[name].entity.ts`
2. **Create a provider** in `src/[module]/entities/[name].providers.ts`
3. **Import DatabaseModule** in your feature module
4. **Add providers** to the module's providers array
5. **Inject repository** in your service using `@Inject('[NAME]_REPOSITORY')`

## Environment Variables

Required environment variables in `.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=connect_flow
```

## Benefits of This Approach

1. **No @nestjs/typeorm dependency**: More control over configuration
2. **Custom providers**: Better understanding of dependency injection
3. **Flexible**: Easy to customize and extend
4. **Testable**: Simple to mock repositories in tests

## Important Notes

⚠️ **Production Considerations:**

- Set `synchronize: false` in production
- Use migrations for schema changes
- Secure database credentials using proper secret management
- Consider connection pooling configuration

## Next Steps

- Implement proper migrations instead of `synchronize: true`
- Add validation decorators to entities
- Implement relations between entities
- Add transaction support for complex operations
- Configure connection pooling for better performance
