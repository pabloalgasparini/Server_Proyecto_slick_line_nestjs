import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Pozo {
    @Prop({ required: true })
    Pozoname: string;

    @Prop([{ type: Types.ObjectId, ref: 'User' }])
    Users: UserDocument[]; // Cambiado a un arreglo de UserDocument

    @Prop({ default: true })
    isActive: boolean;
}

export const PozoSchema = SchemaFactory.createForClass(Pozo);

export type PozoDocument = Pozo & Document;
