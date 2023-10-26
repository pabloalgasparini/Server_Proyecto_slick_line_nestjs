import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get('todos')
  traerTodos(){
    return this.userService.findAllActive();
  }

  @Get('operarios')
  findAllOperario() {
    return this.userService.findAllOperario();
  }

  @Put('actualizarOperario/:_id')
  findOne(@Param('_id') _id: string) {
   return this.userService.findOperararioToAdmin(_id);
  }

  @Put('actualizarAdmin/:_id')
  findAllAdmin(@Param('_id') _id: string) {
    return this.userService.findAdminToOperario(_id);
  }

  @Patch('actualizar/:_id')
  update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(_id, updateUserDto);
  }

  @Delete('remover/:_id')
  remove(@Param('_id') _id: string) {
    return this.userService.remove(_id);
  }
}
