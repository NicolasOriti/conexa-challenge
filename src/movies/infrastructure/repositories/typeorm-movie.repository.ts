import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviePersistence } from '../persistence/movie.persistence';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { Movie } from '@src/movies/domain/entities/movie.entity';

@Injectable()
export class TypeOrmMovieRepository implements MovieRepository {
  constructor(
    @InjectRepository(MoviePersistence)
    private readonly repository: Repository<MoviePersistence>,
  ) {}

  async save(movie: Movie): Promise<void> {
    const entity = this.repository.create({
      title: movie.title,
      director: movie.director,
      producer: movie.producer,
      releaseDate: movie.releaseDate,
    });

    await this.repository.save(entity);
  }

  async findByTitle(title: string): Promise<Movie | null> {
    const movie = await this.repository.findOne({
      where: { title },
      select: { id: true },
    });

    return movie;
  }
}
