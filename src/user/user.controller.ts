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
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ChangeRoleDto } from './dto/change-user-role.dto';
import { UserEntity } from './entity/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Role } from './role/role.enum';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: `Get a list of users. 
    For different user roles, different user list is displayed. 
    Pagination, sorting by any columns of the table is provided.`,
  })
  @ApiResponse({ status: HttpStatus.OK, type: [UserEntity] })
  @Roles(Role.ADMIN, Role.BOSS, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  getUsers(
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('sortedField') sortedField: string,
    @Request() req,
  ): Observable<UserEntity[] | UserEntity> {
    const LIMIT = 10;
    take = take > LIMIT ? LIMIT : take;
    return this.userService.findUsers(take, skip, sortedField, req.user);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
  @UseGuards(JwtGuard)
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id') id: number,
    @Body() dto: UserDto,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, dto);
  }

  @ApiOperation({ summary: "Change user's role (only for Admin role)" })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/role/:id')
  @HttpCode(HttpStatus.CREATED)
  changeRole(
    @Param('id') id: number,
    @Body() dto: ChangeRoleDto,
  ): Observable<UpdateResult> {
    return this.userService.changeUserRole(id, dto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.removeUser(id);
  }
}
