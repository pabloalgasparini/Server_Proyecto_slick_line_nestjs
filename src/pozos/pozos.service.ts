import { Injectable } from '@nestjs/common';
import { CreatePozoDto } from './dto/create-pozo.dto';
import { UpdatePozoDto } from './dto/update-pozo.dto';
import { Pozo, PozoDocument } from './entities/pozo.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class PozosService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('Pozo') private pozoModel: Model<PozoDocument>,
    ) {}

    async create(userId: string, name: string) {
      try {
          const newPozo = new this.pozoModel();
          const user = await this.userModel.findById(userId);
          
          if (user) {
              newPozo.Pozoname = name;
              newPozo.Users = user._id;
              await newPozo.save();
              await newPozo.populate('Users')
              return newPozo;
          } else {
              console.log('No existe el usuario');
          }
      } catch (error) {
          console.log('Error al cargar pozo', error);
          throw error;
      }
  }
  

    async findAll() {
        try {
            const pozos = await this.pozoModel.find().populate('Users').exec();
            console.log('Excelente');
            return pozos;
        } catch (error) {
            console.log('Error al traer pozos', error);
            throw error;
        }
    }

    async findOne(id: string) {
        try {
            const pozo = await this.pozoModel.findById(id);
            return pozo;
        } catch (error) {
            console.log('No se encontró el pozo', error);
        }
    }

    async update(id: string, updatePozoDto: UpdatePozoDto) {
        try {
            const pozo = await this.pozoModel.findByIdAndUpdate(id, updatePozoDto);
            return pozo;
        } catch (error) {
            console.log('Error al actualizar pozo', error);
        }
    }

    async remove(id: string) {
        try {
            const pozo = await this.pozoModel.findByIdAndUpdate(id, { isActive: false });
            return pozo;
        } catch (error) {
            console.log('Error al remover pozo', error);
        }
    }
}
