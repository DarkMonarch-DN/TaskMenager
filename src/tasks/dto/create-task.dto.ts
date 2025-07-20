import { IsString, Length, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(3, 30)
  title: string;
  @IsString()
  desc: string;
  @IsNumber()
  userId: number;
}
