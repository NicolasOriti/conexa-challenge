import { Inject, Injectable } from '@nestjs/common';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { Movie } from '@src/movies/domain/entities/movie.entity';

@Injectable()
export class GetAllMoviesUseCase {
  constructor(
    @Inject('MovieRepository')
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(): Promise<Movie[]> {
    return this.movieRepository.findAll();
  }
}
