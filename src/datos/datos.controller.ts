import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatosService } from './datos.service';
import { CreateDatoDto } from './dto/create-dato.dto';
import { UpdateDatoDto } from './dto/update-dato.dto';

@Controller('datos')
export class DatosController {
  constructor(private readonly datosService: DatosService) {}

  @Post('create/:userId/:pozoId')
  create(@Param('userId') userId: string,@Param('pozoId') pozoId: string, @Body() 
  body: {
    Time : number, 
    Pressure: number, 
    Temperature: number,
    Depth: number,
    Dp_Dz: number,
    Dt_Dz: number,
    Description: string
  }) {
   return this.datosService.create(
    userId, 
    pozoId,
    body.Time,
    body.Pressure,
    body.Temperature,
    body.Depth,
    body.Dp_Dz,
    body.Dt_Dz,
    body.Description
    )
  }

  @Get('findAll')
  findAll() {
    return this.datosService.findAll();
  }

  @Get('datosPozo/:pozoId')
  findOne(@Param('pozoId') pozoId: string) {
    return this.datosService.findOne(pozoId);
  }

  @Patch('actualizar/:idDatos')
  update(@Param('idDatos') idDatos: string, @Body() updateDatoDto: UpdateDatoDto) {
    return this.datosService.update(idDatos, updateDatoDto);
  }

  @Delete('remove/:idDatos')
  remove(@Param('idDatos') idDatos: string) {
    return this.datosService.remove(idDatos);
  }
}
