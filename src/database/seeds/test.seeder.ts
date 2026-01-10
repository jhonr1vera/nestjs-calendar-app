import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Seeder } from 'typeorm-extension';
import { Role } from 'src/roles/entities/role.entity';

export default class TestSeeder implements Seeder {

    private readonly logger = new Logger(TestSeeder.name);

    public async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(Role);

        this.logger.log('Running TestSeeder...');
        const roleCount = await repository.count();
        this.logger.log(`Current Role Count: ${roleCount}`);

        if (roleCount === 0) {
            this.logger.log('Inserting default roles...');
            await repository.insert([
                { name: 'admin', description: 'Total Access' },
                { name: 'user', description: 'User Access' }
            ]);
            this.logger.log('Roles inserted.');
        } else {
            this.logger.log('Roles already exist. Skipping.');
        }
    }
}