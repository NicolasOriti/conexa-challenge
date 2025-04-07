import { Provider } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { SyncMoviesJob } from './infrastructure/jobs/sync-movies.job';
import { SwapiClient } from './infrastructure/clients/swapi.client';
import { TypeOrmMovieRepository } from './infrastructure/repositories/typeorm-movie.repository';
import { MovieController } from './infrastructure/controllers/movie.controller';
import { SyncMoviesUseCase } from './application/use-cases/sync-movies/sync-movies.usecase';

export const REPOSITORIES: Provider[] = [
  {
    provide: 'MovieRepository',
    useClass: TypeOrmMovieRepository,
  },
];

export const CONTROLLERS = [MovieController];

export const CLIENTS: Provider[] = [
  {
    provide: 'MovieClient',
    useClass: SwapiClient,
  },
];

export const USE_CASES: Provider[] = [SyncMoviesUseCase];

export const SERVICES: Provider[] = [
  {
    provide: 'ConfigService',
    useClass: ConfigService,
  },
  SyncMoviesJob,
  // {
  //   provide: 'EncryptorService',
  //   useClass: BcryptEncryptorService,
  // },
  // {
  //   provide: 'TokenService',
  //   useClass: JwtTokenService,
  // },
  // JwtStrategy,
];
