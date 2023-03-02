import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from '../user/entity/user.entity';
import { SubordinateEntity } from '../subordinate/entity/subordinate.entity';
import { usersSubordinatesTables21677672781743 as usersSubordinatesTablesDocker } from './migrations/1677672781743-users-subordinates-tables-docker';
import { usersSubordinatesTables31677767254869 as usersSubordinatesTablesLocal } from './migrations/1677767254869-users-subordinates-tables-local';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeds/main.seeder';

dotenv.config();

const usersSubordinatesTables =
  process.env.POSTGRES_HOST === 'localhost'
    ? usersSubordinatesTablesLocal
    : usersSubordinatesTablesDocker;

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, SubordinateEntity],
  migrations: [usersSubordinatesTables],
  seeds: [MainSeeder],
  migrationsRun: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
