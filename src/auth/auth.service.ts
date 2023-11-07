import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '../roles/entities/roles.entity';
import { User, UserDocument } from '../user/user.schema'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private jwtService: JwtService
  ) {}

  async signUp(username: string, email: string, password: string, roles: string[]) {
    try {
      const hashedPassword = await User.encryptPassword(password);
      const newUser = new this.userModel();

      newUser.username = username;
      newUser.email = email;
      newUser.password = hashedPassword;
          

      if (roles && roles.length > 0) {
        const foundRoles = await this.roleModel.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
      } else {
        const role = await this.roleModel.findOne({ name: 'operario' });
        newUser.roles = [role._id];
      }

      const saveUser = await newUser.save();

      const token = await this.jwtService.signAsync({ id: saveUser._id  });

      return { token };
    } catch (error) {
      console.error(error);
      throw new Error('Error during signUp');
    }
  }

  async signIn(email: string, password: string) {
    const userFound = await this.userModel.findOne({ email }).populate('roles');

    if (!userFound) {
      throw new Error('El usuario no existe');
    }

    if (!userFound.isActive) {
      throw new Error('El usuario no está activo');
    }

    const matchPassword = await User.comparePassword(password, userFound.password);

    if (!matchPassword) {
      throw new Error('Password incorrecto');
    }

    const token = await this.jwtService.signAsync({ id: userFound._id });

    return { token };
  }
}
