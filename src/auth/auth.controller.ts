import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import AuthService from './auth.service';
import {
  AuthDto,
  AuthSigninDto,
  AuthRefreshDto,
  AuthCreateRoleDto,
  AuthRoleUpdateDto,
  AuthCreatePermissionDto,
  AuthPermissionUpdateDto,
  AuthRoleDeleteDto,
  AuthPermissionDeleteDto,
  AuthUserRolesDto,
  AuthGetUserRolesDto,
  AuthUserPermissionsDto,
  AuthGetUserPermissionsDto,
} from './dto';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

@Controller('auth/')
class AuthController {
  constructor(private authService: AuthService) {}

  //First we begin with the customer signups
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Successfully created user',
  })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  @Post('/signup')
  Signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  SignIn(@Body() dto: AuthSigninDto) {
    return this.authService.signin(dto);
  }

  @Post('/refresh')
  RefreshToken(@Body() dto: AuthRefreshDto) {
    return this.authService.refreshToken(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  GetDetailedMe(@Req() req: Request) {
    return req['user'];
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/roles/create')
  CreateRole(@Body() dto: AuthCreateRoleDto) {
    return this.authService.createRole(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/roles/all')
  GetAllRoles() {
    return this.authService.getRoles();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/roles/update')
  UpdateRole(@Body() dto: AuthRoleUpdateDto) {
    return this.authService.updateRole(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/roles/delete')
  DeleteRole(@Body() dto: AuthRoleDeleteDto) {
    return this.authService.deleteRole(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/permissions/create')
  CreatePermission(@Body() dto: AuthCreatePermissionDto) {
    return this.authService.createPermission(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/permissions/all')
  GetAllPermissions() {
    return this.authService.getPermissions();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/permissions/update')
  UpdatePermissions(@Body() dto: AuthPermissionUpdateDto) {
    return this.authService.updatePermission(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/permissions/delete')
  DeletePermissions(@Body() dto: AuthPermissionDeleteDto) {
    return this.authService.deletePermission(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/user/role/create')
  CreateUSerRoles(@Body() dto: AuthUserRolesDto) {
    return this.authService.assignUserRole(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user/role/all')
  GetAllUserRoles(@Body() dto: AuthGetUserRolesDto) {
    return this.authService.getUserRoles(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/user/role/delete')
  DeleteUserRoles(@Body() dto: AuthUserRolesDto) {
    return this.authService.removeUserRole(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/user/permission/create')
  CreateUSerPermission(@Body() dto: AuthUserPermissionsDto) {
    return this.authService.assignUserPermission(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user/permission/all')
  GetAllUserPermission(@Body() dto: AuthGetUserPermissionsDto) {
    return this.authService.getUserPermissions(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/user/permission/delete')
  DeleteUserPermission(@Body() dto: AuthUserPermissionsDto) {
    return this.authService.removeUserPermission(dto);
  }
}

export default AuthController;
