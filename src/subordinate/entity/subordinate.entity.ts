import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.subordinate)
  boss: UserEntity;
}
