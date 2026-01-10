import { runSeeders } from 'typeorm-extension';
import { AppDataSource } from './data-source';

(async () => {
    try {
        const dataSource = await AppDataSource();

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }

        await runSeeders(dataSource);

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
})();
