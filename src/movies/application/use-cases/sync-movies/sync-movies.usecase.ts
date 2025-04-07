import { Inject, Injectable } from '@nestjs/common';
import { MovieClient } from '@src/movies/domain/clients/movie.client';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { MovieSwapiMapper } from '@src/movies/infrastructure/mappers/movie-swapi.mapper';

@Injectable()
export class SyncMoviesUseCase {
  constructor(
    @Inject('MovieClient')
    private readonly movieClient: MovieClient,
    @Inject('MovieRepository')
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(): Promise<Number> {
    let createdCount = 0;

    const swapiFilms = await this.movieClient.getAll();

    for (const swapiFilm of swapiFilms) {
      const movie = MovieSwapiMapper.toDomain(swapiFilm);
      const exists = await this.movieRepository.findByTitle(movie.title);
      if (!exists) {
        await this.movieRepository.save(movie);
        createdCount++;
      }
    }
    return createdCount;
  }
}
