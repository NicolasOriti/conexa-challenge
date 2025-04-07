import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MovieClient } from '@src/movies/domain/clients/movie.client';

@Injectable()
export class SwapiClient implements MovieClient {
  private readonly logger = new Logger(SwapiClient.name);
  constructor(private readonly http: HttpService) {}

  async getAll(): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.http.get('https://swapi.dev/api/films'),
    );
    this.logger.log(`Received ${data.count} movies from SWAPI`);
    return data.results;
  }
}
