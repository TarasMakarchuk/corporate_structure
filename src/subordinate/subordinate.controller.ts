import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { SubordinateService } from './subordinate.service';
import { SubordinateEntity } from './entity/subordinate.entity';
import { Observable } from 'rxjs';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import { Role } from '../user/role/role.enum';

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

  //TODO: changeBoss and remove;
}
