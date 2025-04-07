import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { Movie } from '@src/movies/domain/entities/movie.entity';

@Injectable()
export class GetMovieByIdUseCase {
  constructor(
    @Inject('MovieRepository')
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);
    return movie;
  }
}
