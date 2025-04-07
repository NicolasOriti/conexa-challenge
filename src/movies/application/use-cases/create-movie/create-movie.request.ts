import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateMovieRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'The Empire Strikes Back' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Irvin Kershner' })
  director: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Gary Kurtz' })
  producer: string;

  @IsDateString()
  @ApiProperty({ example: '1980-05-21' })
  releaseDate: string;
}
