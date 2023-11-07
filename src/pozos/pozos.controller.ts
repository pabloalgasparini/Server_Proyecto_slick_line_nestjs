import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PozosService } from './pozos.service';
import { UpdatePozoDto } from './dto/update-pozo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/is-admin.guard';

@UseGuards(JwtAuthGuard)
@Controller('pozos')
export class PozosController {
  constructor(private readonly pozosService: PozosService) {}

  @UseGuards(IsAdminGuard)
  @Post(':userId')
  create(@Param('userId')userId:string,@Body() body:{name:string}) {
    return this.pozosService.create(userId,body.name);
  }

  
  @Get('')
  findAll() {

    return this.pozosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pozosService.findOne(id);
  }

  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePozoDto: UpdatePozoDto) {
    return this.pozosService.update(id, updatePozoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pozosService.remove(id);
  }
}
