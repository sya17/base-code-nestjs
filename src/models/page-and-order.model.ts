import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PageAndOrderDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  asc: string[];

  @IsString()
  @IsOptional()
  desc: number;
}
