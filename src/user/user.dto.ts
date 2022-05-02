import { IsEmail, IsString, Length, Min, MinLength } from 'class-validator';

export default class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  name: string;
}
