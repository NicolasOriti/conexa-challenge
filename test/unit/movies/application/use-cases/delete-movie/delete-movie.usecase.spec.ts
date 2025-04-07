import { NotFoundException } from '@nestjs/common';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { DeleteMovieUseCase } from '@src/movies/application/use-cases/delete-movie/delete-movie.usecase';
import { Movie } from '@src/movies/domain/entities/movie.entity';

describe('DeleteMovieUseCase', () => {
  let useCase: DeleteMovieUseCase;
  let movieRepository: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    movieRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
      findByTitle: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
    };

    useCase = new DeleteMovieUseCase(movieRepository);
  });

  const existingMovie = Movie.createExisting({
    id: 'abc123',
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz',
    releaseDate: '1977-05-25',
  });

  it('should delete the movie if it exists', async () => {
    movieRepository.findById.mockResolvedValue(existingMovie);

    await useCase.execute('abc123');

    expect(movieRepository.findById).toHaveBeenCalledWith('abc123');
    expect(movieRepository.delete).toHaveBeenCalledWith('abc123');
  });

  it('should throw NotFoundException if the movie does not exist', async () => {
    movieRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
    expect(movieRepository.delete).not.toHaveBeenCalled();
  });
});
