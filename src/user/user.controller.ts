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

  @Get('operarios')
  findAllOperario() {
    return this.userService.findAllOperario();
  }

  @Put(':_id')
  findOne(@Param('_id') _id: string) {
   return this.userService.findOperararioToAdmin(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
