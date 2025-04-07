import { NotFoundException } from '@nestjs/common';
import { GetMovieByIdUseCase } from '@src/movies/application/use-cases/get-movie-by-id/get-movie-by-id.usecase';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { Movie } from '@src/movies/domain/entities/movie.entity';

describe('GetMovieByIdUseCase', () => {
  let useCase: GetMovieByIdUseCase;
  let movieRepository: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    movieRepository = {
      findById: jest.fn(),
      findByTitle: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new GetMovieByIdUseCase(movieRepository);
  });

  it('should return the movie if it exists', async () => {
    const movie = Movie.createExisting({
      id: '1',
      title: 'The Phantom Menace',
      director: 'George Lucas',
      producer: 'Rick McCallum',
      releaseDate: '1999-05-19',
    });

    movieRepository.findById.mockResolvedValue(movie);

    const result = await useCase.execute('1');

    expect(movieRepository.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(movie);
  });

  it('should throw NotFoundException if the movie does not exist', async () => {
    movieRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
