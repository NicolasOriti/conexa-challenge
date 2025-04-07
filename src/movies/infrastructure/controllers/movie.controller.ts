import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  Body,
  Patch,
  Delete,
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
import { DeleteMovieUseCase } from '@src/movies/application/use-cases/delete-movie/delete-movie.usecase';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
export class MovieController {
  constructor(
    private readonly syncMoviesUseCase: SyncMoviesUseCase,
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
    private readonly deleteMovieUseCase: DeleteMovieUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(ValidRoles.user)
  @ApiOperation({ summary: 'Obtener todas las películas' })
  @ApiResponse({
    status: 200,
    description: 'Películas obtenidas correctamente',
  })
  async findAll() {
    return this.getAllMoviesUseCase.execute();
  }

  @Get(':id')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(ValidRoles.user)
  @ApiOperation({ summary: 'Obtener película por ID' })
  @ApiResponse({ status: 200, description: 'Película encontrada' })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.getMovieByIdUseCase.execute(id);
  }

  @Post()
  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(ValidRoles.admin)
  @ApiOperation({ summary: 'Crear nueva película' })
  @ApiResponse({ status: 201, description: 'Película creada correctamente' })
  async createMovie(@Body() body: CreateMovieRequest) {
    const movie = await this.createMovieUseCase.execute(body);
    return { message: 'Movie created successfully', movie };
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(ValidRoles.admin)
  @ApiOperation({ summary: 'Actualizar película existente' })
  @ApiResponse({
    status: 200,
    description: 'Película actualizada correctamente',
  })
  async updateMovie(@Param('id') id: string, @Body() body: UpdateMovieRequest) {
    const movie = await this.updateMovieUseCase.execute(id, body);
    return { message: 'Movie updated successfully', movie };
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(ValidRoles.admin)
  @ApiOperation({ summary: 'Eliminar película' })
  @ApiResponse({ status: 200, description: 'Película eliminada correctamente' })
  async deleteMovie(@Param('id') id: string) {
    await this.deleteMovieUseCase.execute(id);
    return { message: 'Movie deleted successfully' };
  }

  @Post('/sync')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @ApiOperation({ summary: 'Sincronizar películas con SWAPI' })
  @ApiResponse({
    status: 200,
    description: 'Películas sincronizadas correctamente',
  })
  async syncMovies(@Req() req: any) {
    const count = await this.syncMoviesUseCase.execute();
    return { message: `${count} new movies were synchronized` };
  }
}
