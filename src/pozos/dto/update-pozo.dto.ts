import { PartialType } from '@nestjs/mapped-types';
import { CreatePozoDto } from './create-pozo.dto';
import { IsBoolean, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdatePozoDto extends PartialType(CreatePozoDto) {
    @IsString()
    @IsNotEmpty()
    Pozoname?: string;

    @IsString()
    @IsNotEmpty()
    Users?: string;

    @IsBoolean()
    isActive?: boolean;
}

