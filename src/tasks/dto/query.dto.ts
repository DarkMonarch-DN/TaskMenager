import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsIn(['asc', 'desc', 'createAt'])
  sort?: 'asc' | 'desc' | 'createAt';
  @IsString()
  @IsOptional()
  search?: string;
  @IsOptional()
  limit?: number;
}
