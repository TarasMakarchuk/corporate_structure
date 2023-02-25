import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ChangeRoleDto } from './dto/change-user-role.dto';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('sortedField') sortedField: string,
  ): Observable<UserEntity[]> {
    const LIMIT = 10;
    take = take > LIMIT ? LIMIT : take;
    return this.userService.findUsers(take, skip, sortedField);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UserDto,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, dto);
  }

  @Put('/role/:id')
  changeRole(
    @Param('id') id: number,
    @Body() dto: ChangeRoleDto,
  ): Observable<UpdateResult> {
    return this.userService.changeUserRole(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.removeUser(id);
  }
}
