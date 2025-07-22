// src/data-source.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Project } from './projects/projects.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [Project],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
