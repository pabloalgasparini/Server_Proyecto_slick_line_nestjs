import { Controller, Get, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsSuperAdminGuard } from 'src/auth/is-superAdmin.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(IsSuperAdminGuard)
  @Get('todos')
  traerTodos(){
    return this.userService.findAllActive();
  }

  @UseGuards(IsSuperAdminGuard)
  @Get('operarios')
  findAllOperario() {
    return this.userService.findAllOperario();
  }

  @UseGuards(IsSuperAdminGuard)
  @Put('actualizarOperario/:_id')
  findOne(@Param('_id') _id: string) {
   return this.userService.findOperararioToAdmin(_id);
  }

  @UseGuards(IsSuperAdminGuard)
  @Put('actualizarAdmin/:_id')
  findAllAdmin(@Param('_id') _id: string) {
    return this.userService.findAdminToOperario(_id);
  }

  @UseGuards(IsSuperAdminGuard)
  @Patch('actualizar/:_id')
  update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(_id, updateUserDto);
  }

  @UseGuards(IsSuperAdminGuard)
  @Delete('remover/:_id')
  remove(@Param('_id') _id: string) {
    return this.userService.remove(_id);
  }
}
