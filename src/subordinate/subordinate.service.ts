import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubordinateEntity } from './entity/subordinate.entity';
import { from, map, Observable, switchMap } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { Role } from '../user/role/role.enum';
import { ChangeBossDto } from './dto/change-boss.dto';

@Injectable()
export class SubordinateService {
  constructor(
    @InjectRepository(SubordinateEntity)
    private subordinateRepository: Repository<SubordinateEntity>,
    private userService: UserService,
  ) {}

  assignSubordinateToBoss(
    bossId: number,
    userId: number,
  ): Observable<SubordinateEntity> {
    return from(this.subordinateExists(userId)).pipe(
      switchMap((subordinate: SubordinateEntity) => {
        if (subordinate) {
          throw new HttpException(
            'A subordinate is under the supervision of another boss',
            HttpStatus.FORBIDDEN,
          );
        } else {
          return from(this.userService.findUserById(userId)).pipe(
            switchMap((user: UserEntity) => {
              if (user.role === Role.USER) {
                return this.subordinateRepository.save({
                  bossId,
                  userId: user.id,
                });
              } else {
                throw new HttpException(
                  'Only a user can be a subordinate',
                  HttpStatus.FORBIDDEN,
                );
              }
            }),
          );
        }
      }),
    );
  }

  subordinateExists(id: number): Observable<SubordinateEntity> {
    return from(
      this.subordinateRepository.findOne({
        where: [{ userId: id }],
      }),
    );
  }

  findSubordinateById(id: number): Observable<SubordinateEntity> {
    return from(
      this.subordinateRepository.findOne({
        where: [{ userId: id }],
      }),
    ).pipe(
      map((subordinate: SubordinateEntity) => {
        if (!subordinate) {
          throw new HttpException(
            'Subordinate not found',
            HttpStatus.NOT_FOUND,
          );
        }
        return subordinate;
      }),
    );
  }

  changeBossOfSubordinate(
    currentBossId: number,
    dto: ChangeBossDto,
  ): Observable<UpdateResult> {
    return from(this.subordinateExists(dto.subordinateId)).pipe(
      switchMap((subordinate: SubordinateEntity) => {
        if (!subordinate) {
          throw new HttpException(
            'Subordinate not found',
            HttpStatus.NOT_FOUND,
          );
        } else {
          return from(this.userService.findUserById(dto.nextBossId)).pipe(
            switchMap((user: UserEntity) => {
              if (currentBossId === dto.nextBossId) {
                  throw new HttpException(
                      'You cannot assign an subordinate who reports to another boss',
                      HttpStatus.FORBIDDEN,
                  );
              }
              return this.subordinateRepository.update(
                { userId: dto.subordinateId },
                { bossId: user.id },
              );
            }),
          );
        }
      }),
    );
  }

  removeSubordinate(id: number): Observable<DeleteResult> {
    return from(this.findSubordinateById(id)).pipe(
      switchMap((subordinate: SubordinateEntity) => {
        return this.subordinateRepository.delete(subordinate.id);
      }),
    );
  }
}
