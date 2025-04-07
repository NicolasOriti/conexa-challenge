import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { Movie } from '@src/movies/domain/entities/movie.entity';
import { UpdateMovieUseCase } from '@src/movies/application/use-cases/update-movie/update-movie.usecase';
import { UpdateMovieRequest } from '@src/movies/application/use-cases/update-movie/update-movie.request';
import { NotFoundException } from '@nestjs/common';

describe('UpdateMovieUseCase', () => {
  let useCase: UpdateMovieUseCase;
  let movieRepository: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    movieRepository = {
      findByTitle: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new UpdateMovieUseCase(movieRepository);
  });

  const existingMovie = Movie.createExisting({
    id: '123',
    title: 'Old Title',
    director: 'director test',
    producer: 'producer test',
    releaseDate: '1977-05-25',
  });

  it('should update only the title of the movie', async () => {
    const input: UpdateMovieRequest = {
      title: 'New Title',
    };

    movieRepository.findById.mockResolvedValue(existingMovie);

    await useCase.execute('123', input);

    expect(movieRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '123',
        title: 'New Title',
        director: 'director test',
      }),
    );
  });

  it('should throw NotFoundException if the movie does not exist', async () => {
    movieRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id', {})).rejects.toThrow(
      NotFoundException,
    );
    expect(movieRepository.save).not.toHaveBeenCalled();
  });
});
