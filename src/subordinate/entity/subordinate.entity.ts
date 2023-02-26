import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('subordinate')
export class SubordinateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bossId: number;

  @Column()
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.boss)
  subordinate: UserEntity;
}
