import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeBossDto {
  @ApiProperty({ example: '1', description: 'Subordinate identifier' })
  @IsNumber()
  readonly subordinateId: number;

  @ApiProperty({ example: '1', description: 'Next boss identifier' })
  @IsNumber()
  readonly nextBossId: number;
}
