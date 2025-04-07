import { GetAllMoviesUseCase } from '@src/movies/application/use-cases/get-all-movies/get-all-movies.usecase';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { Movie } from '@src/movies/domain/entities/movie.entity';

describe('GetAllMoviesUseCase', () => {
  let useCase: GetAllMoviesUseCase;
  let movieRepository: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    movieRepository = {
      findById: jest.fn(),
      findByTitle: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new GetAllMoviesUseCase(movieRepository);
  });

  it('should return all movies from repository', async () => {
    const movies: Movie[] = [
      Movie.createExisting({
        id: '1',
        title: 'A New Hope',
        director: 'George Lucas',
        producer: 'Gary Kurtz',
        releaseDate: '1977-05-25',
      }),
      Movie.createExisting({
        id: '2',
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner',
        producer: 'Gary Kurtz',
        releaseDate: '1980-05-21',
      }),
    ];

    movieRepository.findAll.mockResolvedValue(movies);

    const result = await useCase.execute();

    expect(movieRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(movies);
  });
});
