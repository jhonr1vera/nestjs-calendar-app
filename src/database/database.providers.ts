
import { DataSource } from 'typeorm';
import { ApiUtil } from 'src/shared/utils/api.util';
import { ConfigService } from '@nestjs/config';
import { ValidatorConstants } from 'src/shared/global/validator.contanst';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const requiredEnvVars = [
                'DATABASE_HOST',
                'DATABASE_PORT',
                'DATABASE_USERNAME',
                'DATABASE_PASSWORD',
                'DATABASE_NAME',
            ];

            const missingVars = requiredEnvVars.filter(key => !configService.get(key));

            if (missingVars.length > 0) {
                throw new Error(
                    ValidatorConstants.env.missing_env.replace('%s', missingVars.join(', '))
                );
            }

            const dataSource = new DataSource({
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USERNAME'),
                password: String(configService.get<string>('DATABASE_PASSWORD')),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [
                    __dirname + '/../**/entities/*.entity{.ts,.js}',
                ],
                synchronize: ApiUtil.isDevEnvironment(),
            });

            return dataSource.initialize();
        },
    },
];
