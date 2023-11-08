import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DatosService } from './datos.service';
import { UpdateDatoDto } from './dto/update-dato.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/is-admin.guard';

@UseGuards(JwtAuthGuard)
@Controller('datos')
export class DatosController {
  constructor(private readonly datosService: DatosService) {}
  
  @UseGuards(IsAdminGuard)
  @Post('create/:userId/:pozoId')
  create(@Param('userId') userId: string,@Param('pozoId') pozoId: string, @Body() 
  body: {
    Time : number, 
    Pressure: number, 
    Temperature: number,
    Depth: number,
    Dp_Dz: number,
    Dt_Dz: number,
    Description: string,
    Density: number,
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

  @Get('findAll')
  findAll() {
    return this.datosService.findAll();
  }

  @Get('datosPozo/:pozoId')
  findOne(@Param('pozoId') pozoId: string) {
    return this.datosService.findOne(pozoId);
  }

  @UseGuards(IsAdminGuard)
  @Patch('actualizar/:idDatos')
  update(@Param('idDatos') idDatos: string, @Body() updateDatoDto: UpdateDatoDto) {
    return this.datosService.update(idDatos, updateDatoDto);
  }

  @UseGuards(IsAdminGuard)
  @Delete('remove/:idDatos')
  remove(@Param('idDatos') idDatos: string) {
    return this.datosService.remove(idDatos);
  }

  @Post('json/:pozoId/:userId')
jsonMap(@Param('pozoId') pozoId: string, @Param('userId') userId: string, @Body() datos: any) {
  return this.datosService.jsonMap(datos, pozoId, userId); // Corregir aquí
}
}
