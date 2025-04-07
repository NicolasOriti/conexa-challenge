import { DataSource } from 'typeorm';
import { UserPersistence } from '../user/infrastructure/persistence/typeorm-user.persistence';
import { MoviePersistence } from '../movies/infrastructure/persistence/movie.persistence';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: ['./src/migrations/*.ts'],
  migrationsRun: false,
  entities: [UserPersistence, MoviePersistence],
});
