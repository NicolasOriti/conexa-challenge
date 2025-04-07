import { Movie } from '@src/movies/domain/entities/movie.entity';

export class MovieSwapiMapper {
  static toDomain(swapiFilm: any): Movie {
    return Movie.create({
      title: swapiFilm.title,
      director: swapiFilm.director,
      producer: swapiFilm.producer,
      releaseDate: swapiFilm.release_date,
    });
  }
}
