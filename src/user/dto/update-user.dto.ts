import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ObjectId } from 'mongoose';
import { IsNotEmpty, IsString, IsBoolean, IsObject, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty({message: "Por favor Ingrese un nombre de usuario"})
    @IsString()
    username?: string;

    @IsNotEmpty({message: "Por favor Ingrese un email"})
    @IsString()
    email?: string;

    @IsNotEmpty({message: "Por favor Ingrese un password de 8 caracteres por lo menos"})
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password?: string;

    @IsBoolean()
    isActive?: boolean;

    @IsObject()
    roles?: ObjectId[];
}
