import { Injectable } from '@nestjs/common';
import { CreateDatoDto } from './dto/create-dato.dto';
import { UpdateDatoDto } from './dto/update-dato.dto';
import { UserDocument } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { PozoDocument } from 'src/pozos/entities/pozo.entity';
import { Datos, DatosDocument } from './entities/dato.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DatosService {
  constructor(
    @InjectModel(Datos.name) private datosModel: Model<DatosDocument>,
    @InjectModel('User') private usermodel: Model<UserDocument>,
    @InjectModel('Pozo') private pozoModel: Model<PozoDocument>,
  ) {}
    
  async create(
   userId:string,
   pozoId:string, 
   Time : number, 
   Pressure: number, 
   Temperature: number,
   Depth: number,
   Dp_Dz: number,
   Dt_Dz: number,
   Description: string
   ){
   try {
    const newDatos = new this.datosModel()
    const user = await this.usermodel.findById(userId)
    const pozo = await this.pozoModel.findById(pozoId)

    if(user && pozo){
      console.log('pasa');
      newDatos.Time = Time,
      newDatos.Pressure = Pressure,
      newDatos.Temperature = Temperature,
      newDatos.Depth = Depth,
      newDatos.Dp_Dz= Dp_Dz,
      newDatos.Dt_Dz = Dt_Dz,
      newDatos.Description = Description,
      newDatos.Pozo = [pozo._id],
      newDatos.User = [user._id]
      newDatos.save()
    }
    return newDatos
   } catch (error) {
    console.log('Error al cargar datos');
    throw error
   }
  }

  async findAll() {
    try {
      const datos = this.datosModel.find()
      return datos
    } catch (error) {
      throw error
    }
  }

  async findOne(pozoId: string) {
    try {
      const datos = await this.datosModel.find();
      const datosPozo = datos.filter(dato => dato.Pozo[0].toString() === pozoId);
      return datosPozo;
    } catch (error) {
      throw error;
    }
  }
  
  

  async update(idDatos: string, updateDatoDto: UpdateDatoDto) {
    try {
      const datos = await this.datosModel.findByIdAndUpdate(idDatos, updateDatoDto)
      return datos
    } catch (error) {
      console.log('Error al actualizar datos', error);
      throw error
    }
  }

  async remove(idDatos: string) {
    try {
      const datos = await this.datosModel.findByIdAndDelete(idDatos)
      return datos
    } catch (error) {
      console.log('Error al eliminar datos', error);
      throw error
    }
  }
}
