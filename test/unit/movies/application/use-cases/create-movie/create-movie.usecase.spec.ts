import { ConflictException } from '@nestjs/common';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { CreateMovieUseCase } from '@src/movies/application/use-cases/create-movie/create-movie.usecase';
import { CreateMovieRequest } from '@src/movies/application/use-cases/create-movie/create-movie.request';
import { Movie } from '@src/movies/domain/entities/movie.entity';

describe('CreateMovieUseCase', () => {
  let useCase: CreateMovieUseCase;
  let movieRepository: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    movieRepository = {
      findByTitle: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };
    useCase = new CreateMovieUseCase(movieRepository);
  });

  const validRequest: CreateMovieRequest = {
    title: 'Test Movie',
    director: 'Test Director',
    producer: 'Test Producer',
    releaseDate: '2025-01-01',
  };

  it("should save the movie if it doesn't exist", async () => {
    movieRepository.findByTitle.mockResolvedValue(null);

    await useCase.execute(validRequest);

    expect(movieRepository.findByTitle).toHaveBeenCalledWith('Test Movie');
    expect(movieRepository.save).toHaveBeenCalledTimes(1);
    expect(movieRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Movie',
      }),
    );
  });

  it('should throw ConflictException if the movie already exists', async () => {
    movieRepository.findByTitle.mockResolvedValue(Movie.create(validRequest));

    await expect(useCase.execute(validRequest)).rejects.toThrow(
      ConflictException,
    );
    expect(movieRepository.save).not.toHaveBeenCalled();
  });
});
