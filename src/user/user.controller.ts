import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ChangeRoleDto } from './dto/change-user-role.dto';
import { UserEntity } from './entity/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id') id: number,
    @Body() dto: UserDto,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, dto);
  }

  @UseGuards(JwtGuard)
  @Put('/role/:id')
  @HttpCode(HttpStatus.CREATED)
  changeRole(
    @Param('id') id: number,
    @Body() dto: ChangeRoleDto,
  ): Observable<UpdateResult> {
    return this.userService.changeUserRole(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.removeUser(id);
  }
}
