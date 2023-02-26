import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubordinateEntity } from './entity/subordinate.entity';
import { from, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';

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
            'Subordinate is already busy',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          return from(this.userService.findUserById(userId)).pipe(
            switchMap((user: UserEntity) => {
              return this.subordinateRepository.save({
                bossId,
                userId: user.id,
              });
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
}
