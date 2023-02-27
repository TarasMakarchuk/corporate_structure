import { Role } from '../role/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeRoleDto {
  @ApiProperty({ example: 'Admin | Boss | User', description: "User's role" })
  readonly role: Role;
}
