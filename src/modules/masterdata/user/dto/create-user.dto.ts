import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id: string;

  @MaxLength(100)
  @MinLength(0)
  @IsString()
  @ApiProperty({
    minLength: 0,
    maxLength: 100,
    required: true,
  })
  firstName: string;

  @MaxLength(100)
  @MinLength(0)
  @IsString()
  @ApiProperty({
    minLength: 0,
    maxLength: 100,
    required: true,
  })
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @MaxLength(100)
  @MinLength(5)
  @IsNotEmpty()
  @ApiProperty({
    minLength: 5,
    maxLength: 100,
    required: true,
  })
  username: string;

  @MaxLength(100)
  @MinLength(5)
  @IsNotEmpty()
  @ApiProperty({
    minLength: 5,
    maxLength: 100,
    required: true,
  })
  password: string;

  @MaxLength(1)
  @IsOptional()
  active: string;

  name: string;
}
