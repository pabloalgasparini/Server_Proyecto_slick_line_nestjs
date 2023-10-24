import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Role {
  @Prop()
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

export type RoleDocument = Role & Document;

export const ROLES = ["operario", "superadmin", "admin"];
