import { SwapiClient } from '@src/movies/infrastructure/clients/swapi.client';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosHeaders, AxiosResponse } from 'axios';

describe('SwapiClient', () => {
  let swapiClient: SwapiClient;
  let httpService: jest.Mocked<HttpService>;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
    } as any;

    swapiClient = new SwapiClient(httpService);
  });

  it('should fetch and return movies from SWAPI', async () => {
    const mockData = {
      count: 2,
      results: [{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }],
    };

    const mockResponse: AxiosResponse = {
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    };

    httpService.get.mockReturnValue(of(mockResponse));

    const result = await swapiClient.getAll();

    expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/films');
    expect(result).toEqual(mockData.results);
  });
});
