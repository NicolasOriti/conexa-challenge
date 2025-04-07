import { TypeOrmMovieRepository } from '@src/movies/infrastructure/repositories/typeorm-movie.repository';
import { Repository } from 'typeorm';
import { MoviePersistence } from '@src/movies/infrastructure/persistence/movie.persistence';
import { Movie } from '@src/movies/domain/entities/movie.entity';
import { MovieOrmMapper } from '@src/movies/infrastructure/mappers/movie-orm.mapper';

jest.mock('@src/movies/infrastructure/mappers/movie-orm.mapper');

describe('TypeOrmMovieRepository', () => {
  let repository: TypeOrmMovieRepository;
  let ormRepo: jest.Mocked<Repository<MoviePersistence>>;

  beforeEach(() => {
    ormRepo = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    } as any;

    repository = new TypeOrmMovieRepository(ormRepo);
  });

  const domainMovie = Movie.createExisting({
    id: '1',
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz',
    releaseDate: '1977-05-25',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const persistenceMovie: MoviePersistence = {
    id: '1',
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz',
    releaseDate: '1977-05-25',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should save a movie', async () => {
    (MovieOrmMapper.toOrm as jest.Mock).mockReturnValue(persistenceMovie);

    await repository.save(domainMovie);

    expect(MovieOrmMapper.toOrm).toHaveBeenCalledWith(domainMovie);
    expect(ormRepo.save).toHaveBeenCalledWith(persistenceMovie);
  });

  it('should return all movies', async () => {
    ormRepo.find.mockResolvedValue([persistenceMovie]);
    (MovieOrmMapper.toDomain as jest.Mock).mockReturnValueOnce(domainMovie);
    const result = await repository.findAll();

    expect(ormRepo.find).toHaveBeenCalled();
    expect(result).toEqual([domainMovie]);
  });

  it('should return a movie by id', async () => {
    ormRepo.findOne.mockResolvedValue(persistenceMovie);
    (MovieOrmMapper.toDomain as jest.Mock).mockReturnValue(domainMovie);

    const result = await repository.findById('1');

    expect(ormRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual(domainMovie);
  });

  it('should return null if movie by id not found', async () => {
    ormRepo.findOne.mockResolvedValue(null);

    const result = await repository.findById('non-existent');

    expect(result).toBeNull();
  });

  it('should return a movie by title with selected fields', async () => {
    ormRepo.findOne.mockResolvedValue(persistenceMovie);

    const result = await repository.findByTitle('A New Hope');

    expect(ormRepo.findOne).toHaveBeenCalledWith({
      where: { title: 'A New Hope' },
      select: { id: true },
    });

    expect(result).toEqual(persistenceMovie);
  });

  it('should delete a movie by id', async () => {
    await repository.delete('1');
    expect(ormRepo.delete).toHaveBeenCalledWith({ id: '1' });
  });
});
