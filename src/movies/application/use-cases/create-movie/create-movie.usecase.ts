import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { CreateMovieRequest } from './create-movie.request';
import { Movie } from '@src/movies/domain/entities/movie.entity';

@Injectable()
export class CreateMovieUseCase {
  constructor(
    @Inject('MovieRepository')
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(req: CreateMovieRequest): Promise<Movie> {
    const exists = await this.movieRepository.findByTitle(req.title);
    if (exists) {
      throw new ConflictException(`Movie with ${req.title} already exists`);
    }

    const movie = Movie.create({ ...req });
    await this.movieRepository.save(movie);
    return movie;
  }
}
