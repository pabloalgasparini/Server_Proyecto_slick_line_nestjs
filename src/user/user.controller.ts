import { Controller, Get, Body, Patch, Param, Delete, Put, UseGuards, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsSuperAdminGuard } from 'src/auth/is-superAdmin.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(IsSuperAdminGuard)
  @Post('signup') // ruta para registrar usuarios
  async signup(@Body() body: { username: string; email: string; password: string; roles: string[] }) {
    return this.userService.signUp(body.username, body.email, body.password, body.roles);
  }

  @UseGuards(IsSuperAdminGuard)
  @Get('todos') // ruta para trae todos los usuarios
  traerTodos(){
    return this.userService.findAllActive();
  }

 @UseGuards(IsSuperAdminGuard)
  @Get('operarios') // ruta para trae todos los usuarios operarios
  findAllOperario() {
    return this.userService.findAllOperario();
  }

  @UseGuards(IsSuperAdminGuard)
  @Put(':_id/AAdmin') // ruta para actualizar operario a Admin
  findOne(@Param('_id') _id: string) {
   return this.userService.findOperararioToAdmin(_id);
  }

 @UseGuards(IsSuperAdminGuard)
  @Put(':_id/AOprario') // ruta para actualizar Admin a Oprario
  findAllAdmin(@Param('_id') _id: string) {
    return this.userService.findAdminToOperario(_id);
  }

  @UseGuards(IsSuperAdminGuard)
  @Patch(':_id')// ruta para actualizar usuario
  update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(_id, updateUserDto);
  }

  @UseGuards(IsSuperAdminGuard)
  @Delete(':_id/remover') // ruta para remover usuario
  remove(@Param('_id') _id: string) {
    return this.userService.remove(_id);
  }

  @UseGuards(IsSuperAdminGuard)
  @Get(':id')// ruta para traer un usuario
  findUser(@Param('id') id: string) {
    return this.userService.findUser(id)
}
}