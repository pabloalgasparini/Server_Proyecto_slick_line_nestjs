import { Injectable, NestMiddleware } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from './config';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';

import { InjectModel } from '@nestjs/mongoose';
import { ROLES } from 'src/roles/roles.service';
import { UserService } from 'src/user/user.service';

// Extiende la interfaz Request para incluir la propiedad userId
declare global {
  namespace Express {
    interface Request {
      userId: string;
      user: any;
    }
  }
}
// TokenMiddleware
@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;

      if (!token) {
        return res.status(403).json({ message: 'No hay token' });
      }

      let decoded: any;

      try {
        decoded = jwt.verify(token, config.SECRET);
      } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
      }

      req.userId = decoded.id;

      const user = await this.userModel.findById(req.userId).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'No autorizado' });
    }
  }
}

// IsSuperAdminMiddleware
@Injectable()
export class IsSuperAdminMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user; // Acceso al usuario a través de req.user

      const roles = user.roles; // Acceso a los roles a través de user.roles

      let IsSuperAdmin = false;

      for (const role of roles) {
        if (role.name === 'superadmin') {
          IsSuperAdmin = true;
          break;
        }
      }

      if (IsSuperAdmin) {
        return next();
      } else {
        return res.status(403).json({ message: 'El usuario no es superadmin' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor', error });
    }
  }
}

//IsAdminMiddleware
@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user; // Acceso al usuario a través de req.user

      const roles = user.roles; // Acceso a los roles a través de user.roles

      let isAdmin = false;

      for (const role of roles) {
        if (role.name === 'admin') {
          isAdmin = true;
          break;
        }
      }

      if (isAdmin) {
        return next();
      } else {
        return res.status(403).json({ message: 'El usuario no es admin' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor', error });
    }
  }
}

@Injectable()
export class CheckDuplicateUsernameOrEmailMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
      const user = await this.userService.checkUniqueEmailAndUsername({
        email: req.body.email,
        username: req.body.username
      })
      next()
  }
}
@Injectable()
export class CheckRolesExisted implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const ROLES = ['admin', 'operairio', 'superadmin'];

      if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
          if (!ROLES.includes(req.body.roles[i])) {
            return res.status(400).json({
              message: `El Rol ${req.body.roles[i]} no existe`,
            });
          }
        }
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor', error });
    }
  }
}
