import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserRequest {
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'luke@jedi.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({ example: 'Maytheforcebewithyou123' })
  password: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Luke Skywalker' })
  fullname: string;
}
