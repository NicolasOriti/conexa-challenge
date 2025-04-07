import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserRequest {
  @IsEmail()
  @ApiProperty({ example: 'luke@jedi.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'Maytheforcebewithyou123' })
  password: string;
}
