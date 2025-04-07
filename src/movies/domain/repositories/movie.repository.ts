import { Movie } from '../entities/movie.entity';

export interface MovieRepository {
  save(movie: Movie): Promise<void>;
  findByTitle(title: string): Promise<Movie | null>;
}
