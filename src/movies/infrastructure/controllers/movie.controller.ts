import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { UserRoleGuard } from '@src/user/infrastructure/guards/user-role.guard';
import { RoleProtected } from '@src/user/infrastructure/decorators/role-protected.decorator';
import { SyncMoviesUseCase } from '@src/movies/application/use-cases/sync-movies/sync-movies.usecase';
import { ValidRoles } from '@src/user/infrastructure/interfaces/valid-roles';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MovieController {
  constructor(private readonly syncMoviesUseCase: SyncMoviesUseCase) {}

  @Post('/sync')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  async syncMovies(@Req() req: any) {
    const count = await this.syncMoviesUseCase.execute();
    return { message: `Se sincronizaron ${count} películas nuevas` };
  }
}
