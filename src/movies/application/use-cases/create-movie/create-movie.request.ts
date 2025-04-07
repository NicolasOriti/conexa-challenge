import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateMovieRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsDateString()
  releaseDate: string;
}
