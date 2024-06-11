import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'john.doe@example.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 2, required: true })
  @IsInt()
  @IsNotEmpty()
  role_id: number;

  @ApiProperty({ example: '254712345678', required: true })
  @IsString()
  @IsNotEmpty()
  msisdn: string;

  @ApiProperty({ example: 'John Doe', required: true })
  @IsString()
  @IsNotEmpty()
  user_names: string;

  @ApiProperty({ example: 2, required: true })
  @IsInt()
  @IsNotEmpty()
  organization_id: number;
}

export class AuthSigninDto {
  @ApiProperty({ example: 'john.doe@example.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthRefreshDto {
  @ApiProperty({ example: 'qop@=jdiuhcyduf5rree=..', required: true })
  @IsString()
  @IsNotEmpty()
  refresh: string;
}

export class AuthCreateRoleDto {
  @ApiProperty({ example: 'Admin', required: true })
  @IsString()
  @IsNotEmpty()
  role_name: string;
}

export class AuthRoleUpdateDto {
  @ApiProperty({ example: 1, required: true })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Admin', required: true })
  @IsString()
  @IsNotEmpty()
  role_name: string;
}

export class AuthRoleDeleteDto {
  @ApiProperty({ example: '1', required: true })
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class AuthCreatePermissionDto {
  @ApiProperty({ example: 'Admin', required: true })
  @IsString()
  @IsNotEmpty()
  permission_name: string;
}

export class AuthPermissionUpdateDto {
  @ApiProperty({ example: 1, required: true })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Admin', required: true })
  @IsString()
  @IsNotEmpty()
  permission_name: string;
}

export class AuthPermissionDeleteDto {
  @ApiProperty({ example: '1', required: true })
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class AuthUserRolesDto {
  @ApiProperty({ example: '1', required: true })
  @IsInt()
  @IsNotEmpty()
  role_id: number;

  @ApiProperty({ example: '1', required: true })
  @IsInt()
  @IsNotEmpty()
  permission_id: number;
}

export class AuthGetUserRolesDto {
  @ApiProperty({ example: '1', required: true })
  @IsInt()
  @IsNotEmpty()
  role_id: number;
}

export class AuthUserPermissionsDto {
  @ApiProperty({ example: '1', required: true })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: '1', required: true })
  @IsInt()
  @IsNotEmpty()
  permission_id: number;
}

export class AuthGetUserPermissionsDto {
  @ApiProperty({ example: '1', required: true })
  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
