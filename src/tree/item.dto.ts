/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class PathDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}

export class ActivityDto {
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsString()
  title: string;

  @IsNumber()
  coef: number;
}

export class ResourceDto {
  @IsString()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsNumber()
  activityId?: number;
}
