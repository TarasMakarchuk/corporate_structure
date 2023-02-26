import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { ChangeRoleDto } from './dto/change-user-role.dto';
import { Role } from './role/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findUsers(
    take: number,
    skip: number,
    sortedField: string,
  ): Observable<UserEntity[]> {
    return from(
      this.userRepository
        .createQueryBuilder('user')
        .orderBy(`user.${sortedField}`, 'ASC')
        .take(take)
        .skip(skip)
        .getMany(),
    );
  }

  createUser(dto: UserDto): Observable<UserDto> {
    return from(this.userRepository.save(dto)).pipe(
      map((user: UserEntity) => {
        delete user.password;
        return user;
      }),
    );
  }

  findUserById(id: number): Observable<UserEntity> {
    return from(
      this.userRepository.findOne({
        where: [{ id }],
      }),
    ).pipe(
      map((user: UserEntity) => {
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        delete user.password;
        return user;
      }),
    );
  }

  updateUser(id: number, dto: UserDto): Observable<UpdateResult> {
    return from(this.findUserById(id)).pipe(
      switchMap((user: UserEntity) => {
        return this.userRepository.update(user.id, dto);
      }),
    );
  }

  changeUserRole(id: number, dto: ChangeRoleDto): Observable<UpdateResult> {
    const roleExists = Object.values(Role).includes(dto.role);
    if (!roleExists) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return from(this.findUserById(id)).pipe(
      switchMap((user: UserEntity) => {
        return this.userRepository.update(user.id, dto);
      }),
    );
  }

  removeUser(id: number): Observable<DeleteResult> {
    return from(this.findUserById(id)).pipe(
      switchMap((user: UserEntity) => {
        return this.userRepository.delete(user.id);
      }),
    );
  }
}
