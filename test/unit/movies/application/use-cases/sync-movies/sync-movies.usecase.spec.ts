import { SyncMoviesUseCase } from '@src/movies/application/use-cases/sync-movies/sync-movies.usecase';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { MovieClient } from '@src/movies/domain/clients/movie.client';
import { Movie } from '@src/movies/domain/entities/movie.entity';
import { MovieSwapiMapper } from '@src/movies/infrastructure/mappers/movie-swapi.mapper';

jest.mock('@src/movies/infrastructure/mappers/movie-swapi.mapper');

describe('SyncMoviesUseCase', () => {
  let useCase: SyncMoviesUseCase;
  let movieClient: jest.Mocked<MovieClient>;
  let movieRepository: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    movieClient = { getAll: jest.fn() } as any;
    movieRepository = {
      findById: jest.fn(),
      findByTitle: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new SyncMoviesUseCase(movieClient, movieRepository);
  });

  it('should save only movies that do not exist and return count', async () => {
    const swapiData = [
      { title: 'A New Hope', director: 'George Lucas' },
      { title: 'The Empire Strikes Back', director: 'Irvin Kershner' },
    ];

    const domainMovies = [
      Movie.create({
        title: 'A New Hope',
        director: 'George Lucas',
        producer: '',
        releaseDate: '',
      }),
      Movie.create({
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner',
        producer: '',
        releaseDate: '',
      }),
    ];

    movieClient.getAll.mockResolvedValue(swapiData);

    // Simulamos el mapeo
    (MovieSwapiMapper.toDomain as jest.Mock).mockImplementation((data) =>
      domainMovies.find((m) => m.title === data.title),
    );

    movieRepository.findByTitle.mockResolvedValueOnce(null); // no existe
    movieRepository.findByTitle.mockResolvedValueOnce(domainMovies[1]); // ya existe

    const count = await useCase.execute();

    expect(movieClient.getAll).toHaveBeenCalled();
    expect(movieRepository.save).toHaveBeenCalledTimes(1);
    expect(count).toBe(1);
  });
});
