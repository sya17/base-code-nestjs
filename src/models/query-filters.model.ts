import { Transform, Type } from 'class-transformer';
import { IsOptional, IsArray, IsString } from 'class-validator';

export class queryFilters {
  @IsOptional()
  // @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  //   @Transform((value: string) => value.split(','))
  filters?: string[];
}
