import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RoleDocument } from '../roles/entities/roles.entity';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({unique: true, required: true})
  username: string;

  @Prop({unique: true, required: true})
  email: string;

  @Prop()
  password: string;

  @Prop({default: true})
  isActive: boolean;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Role' }] }) 
  roles: RoleDocument[]; 

  static async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
