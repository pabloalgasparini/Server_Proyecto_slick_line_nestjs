import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/roles/entities/roles.entity';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              @InjectModel(Role.name) private roleModel: Model<RoleDocument>) { }
  
  async findAllOperario() {
    //operarioId = await this.
    const operarios = await this.userModel.find().populate('roles')
    
    const nuevos = operarios.filter(operario => operario.roles[0].name === "operario")
    console.log({operarios})
    return nuevos;
  }

  async findOperararioToAdmin(_id: string) {

    const operario = await this.userModel.findById(_id).populate('roles')
    
    const roleAdmin= await this.roleModel.find({name: 'admin'})
    if(operario){
      operario.roles[0]._id = roleAdmin[0]._id
      operario.roles[0].name = roleAdmin[0].name
    }
    return operario
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async checkUniqueEmailAndUsername ({username, email}) {
    try {
      const usernameExists = await this.userModel.findOne({ username }).exec();
      const emailExists = await this.userModel.findOne({ email }).exec();

      if (usernameExists) {
        return console.log('El nombre de usuario ya existe', username);
      }

      if (emailExists) {
        return console.log('El email ya existe', email);
      }

    } catch (error) {
      return console.log(error);
    }
  }
}
