import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviePersistence } from '../persistence/movie.persistence';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';
import { Movie } from '@src/movies/domain/entities/movie.entity';
import { MovieOrmMapper } from '../mappers/movie-orm.mapper';

@Injectable()
export class TypeOrmMovieRepository implements MovieRepository {
  constructor(
    @InjectRepository(MoviePersistence)
    private readonly repository: Repository<MoviePersistence>,
  ) {}

  async save(movie: Movie): Promise<void> {
    const orm = MovieOrmMapper.toOrm(movie);

    await this.repository.save(orm);
  }

  async findAll(): Promise<Movie[]> {
    const entities = await this.repository.find();
    return entities.map(MovieOrmMapper.toDomain);
  }

  async findById(id: string): Promise<Movie | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? MovieOrmMapper.toDomain(entity) : null;
  }

  async findByTitle(title: string): Promise<Movie | null> {
    const movie = await this.repository.findOne({
      where: { title },
      select: { id: true },
    });

    return movie;
  }
}
