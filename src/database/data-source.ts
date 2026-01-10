import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import TestSeeder from './seeds/test.seeder';
import { SeederOptions } from 'typeorm-extension';
import InitialSeeder from './seeds/initial.seeders';
import { ApiUtil } from 'src/shared/utils/api.util';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
    ],
})
class ConfigLoaderModule { }

export const AppDataSource = async (): Promise<DataSource> => {
    const app = await NestFactory.createApplicationContext(ConfigLoaderModule);
    const configService = app.get(ConfigService);

    const options: DataSourceOptions & SeederOptions = {
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: String(configService.get<string>('DATABASE_PASSWORD')),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: false,
        dropSchema: false,
        logging: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        seeds: ApiUtil.isTestEnvironment() ? [TestSeeder] : [InitialSeeder],
    };

    const dataSource = new DataSource(options);
    await app.close();
    return dataSource;
};

export default AppDataSource();
