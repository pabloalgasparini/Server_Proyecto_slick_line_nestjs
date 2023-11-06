import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PozosService } from './pozos.service';
import { CreatePozoDto } from './dto/create-pozo.dto';
import { UpdatePozoDto } from './dto/update-pozo.dto';

@Controller('pozos')
export class PozosController {
  constructor(private readonly pozosService: PozosService) {}

  @Post('nuevo/:userId')
  create(@Param('userId')userId:string,@Body() body:{name:string}) {
    return this.pozosService.create(userId,body.name);
  }

  @Get('all')
  findAll() {
    return this.pozosService.findAll();
  }

  @Get('unpozo/:id')
  findOne(@Param('id') id: string) {
    return this.pozosService.findOne(id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: string, @Body() updatePozoDto: UpdatePozoDto) {
    return this.pozosService.update(id, updatePozoDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.pozosService.remove(id);
  }
}
