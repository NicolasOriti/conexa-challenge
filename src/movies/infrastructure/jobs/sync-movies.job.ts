import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SyncMoviesUseCase } from '@src/movies/application/use-cases/sync-movies/sync-movies.usecase';

@Injectable()
export class SyncMoviesJob {
  private readonly logger = new Logger(SyncMoviesJob.name);
  constructor(private readonly syncMoviesUseCase: SyncMoviesUseCase) {}

  @Cron('0 3 * * *')
  async handleCron() {
    const count = await this.syncMoviesUseCase.execute();
    this.logger.log(`Se sincronizaron ${count} películas nuevas`);
  }
}
