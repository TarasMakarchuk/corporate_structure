import { IsNumber } from 'class-validator';

export class ChangeBossDto {
  @IsNumber()
  readonly subordinateId: number;
  @IsNumber()
  readonly nextBossId: number;
}
