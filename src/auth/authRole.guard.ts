import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    console.log(requiredRoles, 'requiredRoles');
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Asegúrate de que tu AuthGuard ya ha asignado el usuario al request
    const hasRole = () => requiredRoles.includes(user.role.name);
    console.log(hasRole(), 'hasRole');
    if (!user || !user.role || !hasRole()) {
      throw new UnauthorizedException(
        'No tienes permiso para acceder a este recurso',
      );
    }

    return true;
  }
}
