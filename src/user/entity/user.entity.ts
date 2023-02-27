import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../role/role.enum';
import { SubordinateEntity } from '../../subordinate/entity/subordinate.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John', description: 'First name' })
  @Column({ name: 'first_name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Column({ name: 'last_name' })
  lastName: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '1234556', description: 'Password' })
  @Column({ select: false })
  password: string;

  @ApiProperty({
    example: 'Admin | Boss | User',
    description: "User's role, unique value",
  })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => SubordinateEntity,
    (subordinate: SubordinateEntity) => subordinate.boss,
  )
  subordinate: SubordinateEntity[];
}
