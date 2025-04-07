import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'The Empire Strikes Back',
    description: 'Título de la película',
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Irvin Kershner',
    description: 'Director de la película',
    required: false,
  })
  director?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Gary Kurtz',
    description: 'Productor de la película',
    required: false,
  })
  producer?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '1980-05-21',
    description: 'Fecha de estreno de la película',
    required: false,
  })
  releaseDate?: string;
}
