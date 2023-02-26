import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SubordinateService } from './subordinate.service';
import { SubordinateEntity } from './entity/subordinate.entity';
import { Observable } from 'rxjs';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import { Role } from '../user/role/role.enum';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ChangeBossDto } from './dto/change-boss.dto';

@Controller('subordinate')
export class SubordinateController {
  constructor(private subordinateService: SubordinateService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.BOSS)
  @Post(':id')
  assignSubordinate(
    @Param('id') userId: number,
    @Request() req,
  ): Observable<SubordinateEntity> {
    return this.subordinateService.assignSubordinateToBoss(
      req.user.id,
      Number(userId),
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.BOSS)
  @Put()
  changeBoss(
    @Body() dto: ChangeBossDto,
    @Request() req,
  ): Observable<UpdateResult> {
    return this.subordinateService.changeBossOfSubordinate(req.user.id, dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.BOSS)
  @Delete(':id')
  deleteSubordinate(@Param('id') id: number): Observable<DeleteResult> {
    return this.subordinateService.removeSubordinate(id);
  }
}
