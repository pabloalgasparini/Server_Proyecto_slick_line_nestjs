import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/roles/roles.service';

@Injectable()
export class IsSuperAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest()

    const misRoles = request.user.roles.map(role => role.name)

    if (!misRoles.includes(Roles.SUPERADMIN)) throw new UnauthorizedException('No posee permiso de superadmin')

    return true;
  }
}