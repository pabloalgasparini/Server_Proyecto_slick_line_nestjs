import { Injectable } from '@nestjs/common';
import { CreatePozoDto } from './dto/create-pozo.dto';
import { UpdatePozoDto } from './dto/update-pozo.dto';
import { Pozo, PozoDocument} from './entities/pozo.entity'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class PozosService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Pozo') private pozoModel: Model<PozoDocument>

  ){}
 async create(_id: string, name: string) {
    try {
      const newPozo = new this.pozoModel();
      const user = await this.userModel.findById(_id).populate('User');
      console.log(user);
      if (user) {
        newPozo.Pozoname = name
      newPozo.usuario= user._id;
      console.log(user._id);
      newPozo.save();
      return newPozo
      }else{
        console.log('no existe el usuario');
      }
    } catch (error) {
      console.log('Error al cargar pozo', error);
      
       throw error;      
    }
  }

  async findAll() {
    try {
      const pozos = await this.pozoModel.find().populate('usuario').exec();
      console.log('Excelente');
      return pozos;
    } catch (error) {
      console.log('Error al traer pozos', error);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pozo`;
  }

  update(id: number, updatePozoDto: UpdatePozoDto) {
    return `This action updates a #${id} pozo`;
  }

  remove(id: number) {
    return `This action removes a #${id} pozo`;
  }
}
