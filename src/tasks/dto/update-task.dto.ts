import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  title?: string;
  @IsOptional()
  @IsString()
  desc?: string;
}
