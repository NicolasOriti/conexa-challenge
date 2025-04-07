import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { MovieRepository } from '@src/movies/domain/repositories/movie.repository';

@Injectable()
export class DeleteMovieUseCase {
  constructor(
    @Inject('MovieRepository')
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);
    await this.movieRepository.delete(id);
  }
}
