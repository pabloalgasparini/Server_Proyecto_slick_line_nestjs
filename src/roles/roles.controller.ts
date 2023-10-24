import { Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create-if-not-exist')
  async createRolesIfNotExist(): Promise<string> {
    try {
      await this.rolesService.createRolesIfNotExist();
      return 'Roles created if not exist.';
    } catch (error) {
      return `Error creating roles: ${error.message}`;
    }
  }

  @Get('traer-roles')
  async getAllRoles(): Promise<string[]> {
    const roles = await this.rolesService.getAllRoles();
    return roles;
  }
}
