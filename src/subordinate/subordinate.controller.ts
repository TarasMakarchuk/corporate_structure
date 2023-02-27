import {
  Body,
  Controller,
  Delete,
  HttpStatus,
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Subordinates')
@Controller('subordinate')
export class SubordinateController {
  constructor(private subordinateService: SubordinateService) {}

  @ApiOperation({
    summary: `Assign a subordinate to the boss (only the "Boss" role can be assigned, а subordinate can only have one boss)`,
  })
  @ApiResponse({ status: HttpStatus.OK, type: SubordinateEntity })
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

  @ApiOperation({
    summary: `Change the boss of the subordinate (only the boss who has the subordinate can reassign the subordinate to another boss)`,
  })
  @ApiResponse({ status: HttpStatus.OK, type: SubordinateEntity })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.BOSS)
  @Put()
  changeBoss(
    @Body() dto: ChangeBossDto,
    @Request() req,
  ): Observable<UpdateResult> {
    return this.subordinateService.changeBossOfSubordinate(req.user.id, dto);
  }

  @ApiOperation({
    summary: `Delete subordinate (only the boss to whom he is subordinate can remove a subordinate)`,
  })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.BOSS)
  @Delete(':id')
  deleteSubordinate(
    @Param('id') id: number,
    @Request() req,
  ): Observable<DeleteResult> {
    const bossId = req.user.id;
    return this.subordinateService.removeSubordinate(id, bossId);
  }
}
