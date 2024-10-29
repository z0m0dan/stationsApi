import { defineConfig } from '@mikro-orm/mongodb';
import { SeedManager } from '@mikro-orm/seeder';
import { config } from 'dotenv';

config();

const dbConfig = defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: process.env.DB_NAME,
  clientUrl: process.env.DB_URL,
  debug: process.env.NODE_ENV !== 'production',
  extensions: [SeedManager],
});

export default dbConfig;
