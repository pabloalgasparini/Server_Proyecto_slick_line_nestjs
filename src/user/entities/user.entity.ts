import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/roles/entities/roles.entity';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  isActive: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
