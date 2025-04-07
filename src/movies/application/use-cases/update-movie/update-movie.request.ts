import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateMovieRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  producer?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: string;
}
