import { MovieController } from '@src/movies/infrastructure/controllers/movie.controller';
import { GetAllMoviesUseCase } from '@src/movies/application/use-cases/get-all-movies/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '@src/movies/application/use-cases/get-movie-by-id/get-movie-by-id.usecase';
import { CreateMovieUseCase } from '@src/movies/application/use-cases/create-movie/create-movie.usecase';
import { UpdateMovieUseCase } from '@src/movies/application/use-cases/update-movie/update-movie.usecase';
import { DeleteMovieUseCase } from '@src/movies/application/use-cases/delete-movie/delete-movie.usecase';
import { SyncMoviesUseCase } from '@src/movies/application/use-cases/sync-movies/sync-movies.usecase';
import { Movie } from '@src/movies/domain/entities/movie.entity';

describe('MovieController', () => {
  let controller: MovieController;
  let getAllMoviesUseCase: jest.Mocked<GetAllMoviesUseCase>;
  let getMovieByIdUseCase: jest.Mocked<GetMovieByIdUseCase>;
  let createMovieUseCase: jest.Mocked<CreateMovieUseCase>;
  let updateMovieUseCase: jest.Mocked<UpdateMovieUseCase>;
  let deleteMovieUseCase: jest.Mocked<DeleteMovieUseCase>;
  let syncMoviesUseCase: jest.Mocked<SyncMoviesUseCase>;

  beforeEach(() => {
    getAllMoviesUseCase = { execute: jest.fn() } as any;
    getMovieByIdUseCase = { execute: jest.fn() } as any;
    createMovieUseCase = { execute: jest.fn() } as any;
    updateMovieUseCase = { execute: jest.fn() } as any;
    deleteMovieUseCase = { execute: jest.fn() } as any;
    syncMoviesUseCase = { execute: jest.fn() } as any;

    controller = new MovieController(
      syncMoviesUseCase,
      getAllMoviesUseCase,
      getMovieByIdUseCase,
      createMovieUseCase,
      updateMovieUseCase,
      deleteMovieUseCase,
    );
  });

  it('should return all movies', async () => {
    const mockMovies = [
      Movie.createExisting({
        id: '1',
        title: 'A New Hope',
        director: 'George Lucas',
        producer: 'Gary Kurtz',
        releaseDate: '1977-05-25',
      }),
    ];

    getAllMoviesUseCase.execute.mockResolvedValue(mockMovies);

    const result = await controller.findAll();

    expect(getAllMoviesUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(mockMovies);
  });

  it('should return a movie by id', async () => {
    const movie = Movie.createExisting({
      id: '123',
      title: 'The Empire Strikes Back',
      director: 'Irvin Kershner',
      producer: 'Gary Kurtz',
      releaseDate: '1980-05-21',
    });

    getMovieByIdUseCase.execute.mockResolvedValue(movie);

    const result = await controller.findOne('123');

    expect(getMovieByIdUseCase.execute).toHaveBeenCalledWith('123');
    expect(result).toEqual(movie);
  });

  it('should create a new movie', async () => {
    const body = {
      title: 'Return of the Jedi',
      director: 'Richard Marquand',
      producer: 'Howard G. Kazanjian',
      releaseDate: '1983-05-25',
    };

    const movie = Movie.create(body);

    createMovieUseCase.execute.mockResolvedValue(movie);

    const result = await controller.createMovie(body);

    expect(createMovieUseCase.execute).toHaveBeenCalledWith(body);
    expect(result).toEqual({
      message: 'Movie created successfully',
      movie,
    });
  });

  it('should update a movie', async () => {
    const id = '321';
    const body = {
      title: 'A New Hope (Remastered)',
    };

    const updatedMovie = Movie.createExisting({
      id,
      title: body.title,
      director: 'George Lucas',
      producer: 'Gary Kurtz',
      releaseDate: '1977-05-25',
    });

    updateMovieUseCase.execute.mockResolvedValue(updatedMovie);

    const result = await controller.updateMovie(id, body);

    expect(updateMovieUseCase.execute).toHaveBeenCalledWith(id, body);
    expect(result).toEqual({
      message: 'Movie updated successfully',
      movie: updatedMovie,
    });
  });

  it('should delete a movie by id', async () => {
    const id = '654';

    deleteMovieUseCase.execute.mockResolvedValue();

    const result = await controller.deleteMovie(id);

    expect(deleteMovieUseCase.execute).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      message: 'Movie deleted successfully',
    });
  });

  it('should sync movies and return the count', async () => {
    syncMoviesUseCase.execute.mockResolvedValue(3);

    const result = await controller.syncMovies({});

    expect(syncMoviesUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual({
      message: '3 new movies were synchronized',
    });
  });
});
