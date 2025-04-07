import { MovieOrmMapper } from '@src/movies/infrastructure/mappers/movie-orm.mapper';
import { Movie } from '@src/movies/domain/entities/movie.entity';
import { MoviePersistence } from '@src/movies/infrastructure/persistence/movie.persistence';

describe('MovieOrmMapper', () => {
  it('should map ORM entity to domain entity', () => {
    const persistence: MoviePersistence = {
      id: '123',
      title: 'The Empire Strikes Back',
      director: 'Irvin Kershner',
      producer: 'Gary Kurtz',
      releaseDate: '1980-05-21',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-02-01'),
    };

    const domain = MovieOrmMapper.toDomain(persistence);

    expect(domain.id).toBe(persistence.id);
    expect(domain.title).toBe(persistence.title);
    expect(domain.director).toBe(persistence.director);
    expect(domain.producer).toBe(persistence.producer);
    expect(domain.releaseDate).toBe(persistence.releaseDate);
    expect(domain.createdAt).toEqual(persistence.createdAt);
    expect(domain.updatedAt).toEqual(persistence.updatedAt);
  });

  it('should map domain entity to ORM entity', () => {
    const domain = Movie.createExisting({
      id: '456',
      title: 'Return of the Jedi',
      director: 'Richard Marquand',
      producer: 'Howard G. Kazanjian',
      releaseDate: '1983-05-25',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const orm = MovieOrmMapper.toOrm(domain);

    expect(orm).toBeInstanceOf(MoviePersistence);
    expect(orm.id).toBe(domain.id);
    expect(orm.title).toBe(domain.title);
    expect(orm.director).toBe(domain.director);
    expect(orm.producer).toBe(domain.producer);
    expect(orm.releaseDate).toBe(domain.releaseDate);
  });
});
