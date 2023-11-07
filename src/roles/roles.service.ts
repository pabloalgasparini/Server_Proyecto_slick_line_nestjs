import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './entities/roles.entity';
export const ROLES = ["operario", "superadmin", "admin"];
export enum Roles {
  OPERARIO = "operario",
  SUPERADMIN = "superadmin",
  ADMIN = "admin"
}

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRolesIfNotExist(): Promise<void> {
    try {
      const count = await this.roleModel.estimatedDocumentCount();

      if (count === 0) {
        const rolePromises: Promise<RoleDocument>[] = ROLES.map((roleName) =>
          this.roleModel.create({ name: roleName })
        );

        const createdRoles = await Promise.all(rolePromises);
        console.log('Roles creados correctamente:', createdRoles);
      }
    } catch (error) {
      console.error('Error al crear los roles:', error.message);
    }
  }

  async getAllRoles(): Promise<string[]> {
    const roles = await this.roleModel.find().exec();
    return roles.map((role) => role.name);
  }
}
