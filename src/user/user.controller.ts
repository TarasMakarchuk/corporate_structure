import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ChangeRoleDto } from './dto/change-user-role.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() dto: UserDto): Observable<UserDto> {
    return this.userService.createUser(dto);
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
