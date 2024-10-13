import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ResourceProvider } from '../constants';

export class CreateImageResourceDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  fileName: string | null;

  @IsString()
  @IsOptional()
  publicId: string | null;

  @IsNumber()
  @IsOptional()
  width: number | null;

  @IsNumber()
  @IsOptional()
  height: number | null;

  @IsString()
  @IsOptional()
  format: string | null;

  @IsNumber()
  @IsOptional()
  size: number | null;

  @IsEnum(ResourceProvider)
  @IsNotEmpty()
  provider: ResourceProvider;
}
