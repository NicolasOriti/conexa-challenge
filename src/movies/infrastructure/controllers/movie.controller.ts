import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { UserRoleGuard } from '@src/user/infrastructure/guards/user-role.guard';
import { RoleProtected } from '@src/user/infrastructure/decorators/role-protected.decorator';
import { SyncMoviesUseCase } from '@src/movies/application/use-cases/sync-movies/sync-movies.usecase';
import { ValidRoles } from '@src/user/infrastructure/interfaces/valid-roles';
import { AuthGuard } from '@nestjs/passport';
import { GetAllMoviesUseCase } from '@src/movies/application/use-cases/get-all-movies/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '@src/movies/application/use-cases/get-movie-by-id/get-movie-by-id.usecase';
import { CreateMovieUseCase } from '@src/movies/application/use-cases/create-movie/create-movie.usecase';
import { CreateMovieRequest } from '@src/movies/application/use-cases/create-movie/create-movie.request';
import { UpdateMovieRequest } from '@src/movies/application/use-cases/update-movie/update-movie.request';
import { UpdateMovieUseCase } from '@src/movies/application/use-cases/update-movie/update-movie.usecase';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly syncMoviesUseCase: SyncMoviesUseCase,
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
  ) {}

  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(ValidRoles.user)
  @Get()
  async findAll() {
    return this.getAllMoviesUseCase.execute();
  }

  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(ValidRoles.user)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getMovieByIdUseCase.execute(id);
  }

  @Post()
  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(ValidRoles.admin)
  async createMovie(@Body() body: CreateMovieRequest) {
    const movie = await this.createMovieUseCase.execute(body);
    return { message: 'Movie created successfully', movie };
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(ValidRoles.admin)
  async updateMovie(@Param('id') id: string, @Body() body: UpdateMovieRequest) {
    const movie = await this.updateMovieUseCase.execute(id, body);
    return { message: 'Movie updated successfully', movie };
  }

  @Post('/sync')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  async syncMovies(@Req() req: any) {
    const count = await this.syncMoviesUseCase.execute();
    return { message: `${count} new movies were synchronized` };
  }
}
