
import { AppDataSource } from './src/database/data-source';

(async () => {
    try {
        console.log('Getting DataSource...');
        const ds = await AppDataSource();

        console.log('DataSource created. Checking initialization...');

        if (!ds.isInitialized) {
            console.log('Initializing connection...');
            await ds.initialize();
        }
        console.log('Successfully connected to database!');
        console.log('Entities loaded:', ds.entityMetadatas.length);
        if (ds.entityMetadatas.length === 0) {
            console.warn('WARNING: No entities loaded!');
        }
        await ds.destroy();
        process.exit(0);
    } catch (err) {
        console.error('Error in debug script:', err);
        process.exit(1);
    }
})();
