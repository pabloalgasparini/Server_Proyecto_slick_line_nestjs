import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DatosService } from './datos.service';
import { UpdateDatoDto } from './dto/update-dato.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/is-admin.guard';

@UseGuards(JwtAuthGuard)
@Controller('datos')
export class DatosController {
  constructor(private readonly datosService: DatosService) {}

  @Post(':userId/:pozoId') // crear datos en un pozo
  create(@Param('userId') userId: string,@Param('pozoId') pozoId: string, @Body() 
  body: {
    Time : number, 
    Pressure: number, 
    Temperature: number,
    Depth: number,
    Dp_Dz: number,
    Dt_Dz: number,
    Description: string,
    Density: number
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
    body.Description,
    body.Density
    )
  }

  @Get('findAll') // ruta para traer todos los datos
  findAll() {
    return this.datosService.findAll();
  }

  @Get(':pozoId') // ruta para traer los datos de un pozo
  findOne(@Param('pozoId') pozoId: string) {
    return this.datosService.findOne(pozoId);
  }

  @UseGuards(IsAdminGuard)
  @Patch(':idDatos')// ruta para actualizar los datos de un pozo
  update(@Param('idDatos') idDatos: string, @Body() updateDatoDto: UpdateDatoDto) {
    return this.datosService.update(idDatos, updateDatoDto);
  }

  @UseGuards(IsAdminGuard)
  @Delete(':idDatos')// ruta para borara datos
  remove(@Param('idDatos') idDatos: string) {
    return this.datosService.remove(idDatos);
  }

  @Post(':userId/:pozoId/json') // ruta para cargar un archivo json
jsonMap(@Param('pozoId') pozoId: string, @Param('userId') userId: string, @Body() datos: any) {
  return this.datosService.jsonMap(datos, pozoId, userId); // Corregir aquí
}
}
