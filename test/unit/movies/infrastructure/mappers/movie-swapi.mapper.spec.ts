import { MovieSwapiMapper } from '@src/movies/infrastructure/mappers/movie-swapi.mapper';
import { Movie } from '@src/movies/domain/entities/movie.entity';

describe('MovieSwapiMapper', () => {
  it('should map SWAPI film to domain Movie entity', () => {
    const swapiFilm = {
      title: 'A New Hope',
      director: 'George Lucas',
      producer: 'Gary Kurtz',
      release_date: '1977-05-25',
    };

    const movie = MovieSwapiMapper.toDomain(swapiFilm);

    expect(movie).toBeInstanceOf(Movie);
    expect(movie.title).toBe(swapiFilm.title);
    expect(movie.director).toBe(swapiFilm.director);
    expect(movie.producer).toBe(swapiFilm.producer);
    expect(movie.releaseDate).toBe(swapiFilm.release_date);
  });
});
