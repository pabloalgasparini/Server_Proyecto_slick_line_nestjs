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

  async findAllActive(){
    try {
      const users = this.userModel.find({isActive: true});
      console.log('Estos son todos los usuarios');
      return users

    } catch (error) {
      console.log('Error al traer los usuarios', error);
    }
   
  }
  
  async findAllOperario() {
    //operarioId = await this.
    try {
      const operarios = await this.userModel.find().populate('roles')
    
    const nuevos = operarios.filter(operario => operario.roles[0].name === "operario")
    console.log({operarios})
    return nuevos;
    } catch (error) {
      console.log('Error al traer operarios', error);
    }
  }

  async findAdminToOperario(_id: string) {
    try {
      const operario = await this.userModel.findById(_id).populate('roles')
    
      const roleOperario= await this.roleModel.find({name: 'operario'})
      if(operario){
        operario.roles[0]._id = roleOperario[0]._id
        operario.roles[0].name = roleOperario[0].name
      }
      return operario
    } catch (error) {
      console.log('Error al actualizar roles', error);
    }
  }

  async findOperararioToAdmin(_id: string) {
    try {
      const operario = await this.userModel.findById(_id).populate('roles')
    
    const roleAdmin= await this.roleModel.find({name: 'admin'})
    if(operario){
      operario.roles[0]._id = roleAdmin[0]._id
      operario.roles[0].name = roleAdmin[0].name
    }
    return operario
    } catch (error) {
      console.log('Error al hacer la operación', error);
    }
    
  }

 async update(_id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = this.userModel.findByIdAndUpdate(_id, updateUserDto);  
    return user;
    } catch (error) {
      console.log('Error al actualizar usuario', error);
    }
  }

 async remove(_id: string) {
    try {
      const user = this.userModel.findByIdAndUpdate(_id, {isActive: false});
    return user
    } catch (error) {
      console.log('Error al remover usuario', error);
    }
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
