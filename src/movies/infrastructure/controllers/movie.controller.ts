import { Controller, Post, UseGuards, Req, Get, Param } from '@nestjs/common';
import { UserRoleGuard } from '@src/user/infrastructure/guards/user-role.guard';
import { RoleProtected } from '@src/user/infrastructure/decorators/role-protected.decorator';
import { SyncMoviesUseCase } from '@src/movies/application/use-cases/sync-movies/sync-movies.usecase';
import { ValidRoles } from '@src/user/infrastructure/interfaces/valid-roles';
import { AuthGuard } from '@nestjs/passport';
import { GetAllMoviesUseCase } from '@src/movies/application/use-cases/get-all-movies/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '@src/movies/application/use-cases/get-movie-by-id/get-movie-by-id.usecase';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly syncMoviesUseCase: SyncMoviesUseCase,
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
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

  @Post('/sync')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  async syncMovies(@Req() req: any) {
    const count = await this.syncMoviesUseCase.execute();
    return { message: `Se sincronizaron ${count} películas nuevas` };
  }
}
