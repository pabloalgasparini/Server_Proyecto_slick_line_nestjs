import { PartialType } from '@nestjs/mapped-types';
import { CreatePozoDto } from './create-pozo.dto';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdatePozoDto extends PartialType(CreatePozoDto) {
    @IsString()
    @IsNotEmpty()
    Pozoname?: string;

    //@IsObject()
    @IsString()
    @IsNotEmpty()
    User?: string;
}
