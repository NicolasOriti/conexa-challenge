import { Movie } from '@src/movies/domain/entities/movie.entity';
import { MoviePersistence } from '../persistence/movie.persistence';

export class MovieOrmMapper {
  static toDomain(orm: MoviePersistence): Movie {
    return Movie.createExisting({
      id: orm.id,
      title: orm.title,
      director: orm.director,
      producer: orm.producer,
      releaseDate: orm.releaseDate,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toOrm(domain: Movie): MoviePersistence {
    const orm = new MoviePersistence();

    orm.title = domain.title;
    orm.director = domain.director;
    orm.producer = domain.producer;
    orm.releaseDate = domain.releaseDate;

    return orm;
  }
}
