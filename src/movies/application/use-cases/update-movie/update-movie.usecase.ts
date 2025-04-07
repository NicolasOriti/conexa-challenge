import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { UpdateMovieRequest } from './update-movie.request';
import { Movie } from '@src/movies/domain/entities/movie.entity';

@Injectable()
export class UpdateMovieUseCase {
  constructor(
    @Inject('MovieRepository')
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(id: string, req: UpdateMovieRequest): Promise<Movie> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);

    const updated = Movie.createExisting({
      id: movie.id,
      title: req.title ?? movie.title,
      director: req.director ?? movie.director,
      producer: req.producer ?? movie.producer,
      releaseDate: req.releaseDate ?? movie.releaseDate,
    });

    await this.movieRepository.save(updated);
    return updated;
  }
}
