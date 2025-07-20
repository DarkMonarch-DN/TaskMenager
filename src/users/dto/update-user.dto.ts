import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 30)
  username?: string;
  @IsOptional()
  @Length(3, 50)
  @IsEmail()
  email?: string;
}
