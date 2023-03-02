import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from '../user/entity/user.entity';
import { SubordinateEntity } from '../subordinate/entity/subordinate.entity';
import { usersSubordinatesTables21677672781743 } from './migrations/1677672781743-users-subordinates-tables';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, SubordinateEntity],
  migrations: [usersSubordinatesTables21677672781743],
  migrationsRun: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
