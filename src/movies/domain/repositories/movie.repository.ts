import { Movie } from '../entities/movie.entity';

export interface MovieRepository {
  save(movie: Movie): Promise<void>;
  findAll(): Promise<Movie[]>;
  findById(id: string): Promise<Movie | null>;
  findByTitle(title: string): Promise<Movie | null>;
  delete(id: string): Promise<void>;
}
