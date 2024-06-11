import {
  UnauthorizedException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import * as jwtoken from 'jsonwebtoken';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

import {
  AuthDto,
  AuthSigninDto,
  AuthRefreshDto,
  AuthCreateRoleDto,
  AuthRoleUpdateDto,
  AuthRoleDeleteDto,
  AuthCreatePermissionDto,
  AuthPermissionUpdateDto,
  AuthPermissionDeleteDto,
  AuthUserRolesDto,
  AuthGetUserRolesDto,
  AuthUserPermissionsDto,
  AuthGetUserPermissionsDto,
} from './dto';

//////////////////////////////////////////////////////////////////////////////////////////
@Injectable()
class AuthService {
  //First initialize prisma service, Config service and JWT Service
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  //Create Sign up Service for the engineers
  async signup(dto: AuthDto) {
    //check email is whitelisted
    if ((await this.emailCheck(dto.email)) !== true) {
      throw new ForbiddenException(
        'Sign up is restricted to only organization email addresses.',
      );
    }

    //generate password harsh
    const hashPassword = await argon.hash(dto.password);

    try {
      //save the new user to the DB
      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          role_id: dto.role_id,
          organization_id: dto.organization_id,
          msisdn: dto.msisdn,
          user_names: dto.user_names,
          password: hashPassword,
          status: true,
        },
      });

      //delete the password
      delete user.password;

      //create user permissions by sending the user id and role id
      this.AssignPermissions(user.id, user.role_id);

      //return user;
      return user;
    } catch (error) {
      return error;
    }
  }

  async emailCheck(email: string): Promise<boolean> {
    //check the tenant email domain from .env
    const tenantDomain = this.config.get('ORG_EMAIL');

    // Split the email address into its username and domain parts
    const [, domain] = email.split('@');

    // Check the email if not whitelisted return false
    if (domain !== tenantDomain || domain !== 'tinytotos.com') {
      return false;
    }

    return true;
  }

  async getUserPermissionList(userId: number): Promise<string[]> {
    const userPermissions = await this.prisma.userPermissions.findMany({
      where: {
        user_id: userId,
      },
      include: {
        PermissionID: true, // Include the Permissions relation
      },
    });

    // Extract permission names from the query result
    const permissionNames = userPermissions.map(
      (userPermission) => userPermission.PermissionID.permission_name,
    );

    return permissionNames;
  }

  async signin(
    dto: AuthSigninDto,
  ): Promise<{ access: string; refresh: string }> {
    // If domain is for superusers return access and refresh tokens
    const [, domain] = dto.email.split('@');

    let user;

    // If the user is from mtoto user is superadmin
    if (domain === 'mtoto.com') {
      const userPayload = { email: dto.email, password: dto.password };
      const loginURL = 'https://tenants.tinytotos.dev/api/v1/auth/users/signin';

      // Use the above to verify credentials from tenancy service
      await firstValueFrom(
        this.httpService.post(loginURL, userPayload).pipe(
          catchError((error: AxiosError) => {
            // Handle the error and rethrow
            if (error.response) {
              throw new UnauthorizedException('Invalid credentials');
            } else {
              throw new ForbiddenException('Super admin sign-in failed');
            }
          }),
        ),
      );

      // Get credentials for system user
      user = await this.prisma.users.findUnique({
        where: {
          id: 0,
        },
      });

      // The user 0 is a must so the below wouldn't happen unless there was an issue but let's handle it still
      if (!user) {
        throw new ForbiddenException('User does not exist');
      }
    } else {
      //find the user by ID
      user = await this.prisma.users.findUnique({
        where: {
          email: dto.email,
        },
      });

      //If the user does not exist throw an exceptions
      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }
      //Confirm the password
      const passwordMatch = await argon.verify(user.password, dto.password);

      //If the password is wrong throw an exceptions
      if (!passwordMatch) {
        throw new UnauthorizedException('Password does not match');
      }
    }

    const permissions: string[] = await this.getUserPermissionList(
      Number(user.id),
    );

    //else return a JWT with access and refresh token
    return this.JwtSignToken(
      user.id,
      user.user_names,
      user.msisdn,
      user.email,
      user.role_id,
      user.organization_id,
      permissions,
    );
  }

  async JwtSignToken(
    userId: number,
    user_names: string,
    msisdn: string,
    email: string,
    role_id: number,
    organization_id: number,
    permissions: string[],
  ): Promise<{ access: string; refresh: string }> {
    //this will receive the id and id number
    const payload = {
      userId,
      user_names,
      msisdn,
      email,
      role_id,
      organization_id,
      permissions,
      type: 'access',
    };
    //This will then transform the 2 to JWT
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '16000m',
      secret: secret,
    });

    // Generate refresh token
    const refreshTokenPayload = {
      userId,
      type: 'refresh',
    };

    // This will transform the payload into a JWT refresh token
    const refreshSecret = this.config.get('JWT_REFRESH_SECRET');
    const refreshToken = await this.jwt.signAsync(refreshTokenPayload, {
      expiresIn: '1d',
      secret: refreshSecret,
    });

    // Store the refresh token in the database for the user
    await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    return {
      access: token,
      refresh: refreshToken,
    };
  }

  async refreshToken(
    AuthRefreshDto: AuthRefreshDto,
  ): Promise<{ access: string; refresh: string }> {
    try {
      // Verify the refresh token and extract the user ID

      const decoded: any = jwtoken.verify(
        AuthRefreshDto.refresh,
        this.config.get('JWT_REFRESH_SECRET'),
      );

      const userId = decoded.userId;

      // Check if the user exists in the database
      const user = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new ForbiddenException('User does not exist');
      }

      // Check if the user's refresh token matches the one provided
      if (user.refresh_token !== AuthRefreshDto.refresh) {
        throw new ForbiddenException('Invalid refresh token');
      }

      // Generate a new access token
      const accessPayload = {
        userId: user.id,
        user_names: user.user_names,
        msisdn: user.msisdn,
        email: user.email,
        role_id: user.role_id,
        organization_id: user.organization_id,
        type: 'access',
      };
      const accessSecret = this.config.get('JWT_SECRET');
      const accessToken = await this.jwt.signAsync(accessPayload, {
        expiresIn: '1600m',
        secret: accessSecret,
      });

      // Generate a new refresh token
      const refreshPayload = {
        userId: user.id,
        type: 'refresh',
      };
      const refreshSecret = this.config.get('JWT_REFRESH_SECRET');
      const newRefreshToken = await this.jwt.signAsync(refreshPayload, {
        expiresIn: '1d',
        secret: refreshSecret,
      });

      // Update the user's refresh token in the database
      await this.prisma.users.update({
        where: { id: user.id },
        data: { refresh_token: newRefreshToken },
      });

      // Return the new access token and refresh token
      return { access: accessToken, refresh: newRefreshToken };
    } catch (error) {
      if (error instanceof jwtoken.TokenExpiredError) {
        throw new UnauthorizedException('Refresh token has expired');
      } else if (error instanceof jwtoken.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid refresh token');
      } else {
        throw error;
      }
    }
  }

  //create function for assigning roles
  async AssignPermissions(userID, roleID): Promise<boolean> {
    //first check if the user has any roles
    const hasPermissions = this.prisma.userPermissions.findMany({
      where: {
        user_id: userID,
      },
    });
    //if user has permissions delete this
    if (hasPermissions) {
      await this.prisma.userPermissions.deleteMany({
        where: {
          user_id: userID,
        },
      });
    }

    //generate permissions based on roles
    const userRolePermissions: { permission_id: number }[] =
      await this.prisma.userRoles.findMany({
        where: {
          role_id: roleID,
        },
        select: {
          permission_id: true,
        },
      });

    //foreach create a permission record
    const permissionIds: number[] = userRolePermissions.map(
      (userRole: { permission_id: number }) => userRole.permission_id,
    );

    //if there is an error add to a list and send notification
    await Promise.all(
      permissionIds.map(async (permissionId: number) => {
        await this.prisma.userPermissions.create({
          data: {
            user_id: userID,
            permission_id: permissionId,
          },
        });
      }),
    );

    return true;
  }

  async createRole(dto: AuthCreateRoleDto) {
    return this.prisma.roles.create({
      data: { role_name: dto.role_name },
    });
  }

  async getRoles() {
    return this.prisma.roles.findMany();
  }

  async updateRole(dto: AuthRoleUpdateDto) {
    return this.prisma.roles.update({
      where: { id: dto.id },
      data: { role_name: dto.role_name },
    });
  }

  async deleteRole(dto: AuthRoleDeleteDto) {
    return this.prisma.roles.delete({ where: { id: dto.id } });
  }

  async createPermission(dto: AuthCreatePermissionDto) {
    return this.prisma.permissions.create({
      data: { permission_name: dto.permission_name },
    });
  }

  async getPermissions() {
    return this.prisma.permissions.findMany();
  }

  async updatePermission(dto: AuthPermissionUpdateDto) {
    return this.prisma.permissions.update({
      where: { id: dto.id },
      data: { permission_name: dto.permission_name },
    });
  }

  async deletePermission(dto: AuthPermissionDeleteDto) {
    return this.prisma.permissions.delete({ where: { id: dto.id } });
  }

  async assignUserRole(dto: AuthUserRolesDto) {
    return this.prisma.userRoles.create({
      data: { role_id: dto.role_id, permission_id: dto.permission_id },
    });
  }

  async getUserRoles(dto: AuthGetUserRolesDto) {
    return this.prisma.userRoles.findMany({ where: { role_id: dto.role_id } });
  }

  async removeUserRole(dto: AuthUserRolesDto) {
    return this.prisma.userRoles.deleteMany({
      where: { role_id: dto.role_id, permission_id: dto.permission_id },
    });
  }

  async assignUserPermission(dto: AuthUserPermissionsDto) {
    return this.prisma.userPermissions.create({
      data: { user_id: dto.user_id, permission_id: dto.permission_id },
    });
  }

  async getUserPermissions(dto: AuthGetUserPermissionsDto) {
    return this.prisma.userPermissions.findMany({
      where: { user_id: dto.user_id },
    });
  }

  async removeUserPermission(dto: AuthUserPermissionsDto) {
    return this.prisma.userPermissions.deleteMany({
      where: { user_id: dto.user_id, permission_id: dto.permission_id },
    });
  }
}

export default AuthService;
