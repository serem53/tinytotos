import { Test, TestingModule } from '@nestjs/testing';
import AuthService from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as argon from 'argon2';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let mockAxios: MockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        JwtService,
        ConfigService,
        HttpService,
        {
          provide: HttpService,
          useValue: new HttpService(axios),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Auth Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      role_id: 1,
      organization_id: 1,
      msisdn: '123456789',
      user_names: 'Test User',
      password: 'hashedPassword',
      refresh_token: 'refreshToken',
      status: true,
      created_by: 1,
      created_at: new Date(),
      updated_by: 1,
      updated_at: new Date(),
    };

    jest.spyOn(prisma.users, 'create').mockResolvedValue(mockUser);
    jest.spyOn(service, 'emailCheck').mockResolvedValue(true);
    jest.spyOn(service, 'AssignPermissions').mockImplementation();

    const result = await service.signup({
      email: 'test@example.com',
      password: 'password',
      role_id: 1,
      organization_id: 1,
      msisdn: '123456789',
      user_names: 'Test User',
    });

    expect(result).toEqual(mockUser);
  });

  it('should sign in user and return JWT tokens', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      role_id: 1,
      organization_id: 1,
      user_names: 'Test User',
      msisdn: '123456789',
      refresh_token: 'refreshToken',
      status: true,
      created_by: 1,
      created_at: new Date(),
      updated_by: 1,
      updated_at: new Date(),
    };

    jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(mockUser);
    jest.spyOn(prisma.users, 'update').mockResolvedValue(mockUser);
    jest.spyOn(argon, 'verify').mockResolvedValue(true);
    jest.spyOn(service, 'getUserPermissionList').mockResolvedValue(['perm1']);

    const result = await service.signin({
      email: 'test@example.com',
      password: 'password',
    });

    expect(result).toEqual({
      access: expect.any(String),
      refresh: expect.any(String),
    });
  });

  it('should refresh token', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      role_id: 1,
      organization_id: 1,
      user_names: 'Test User',
      msisdn: '123456789',
      refresh_token: 'refreshToken',
      status: true,
      created_by: 1,
      created_at: new Date(),
      updated_by: 1,
      updated_at: new Date(),
    };

    jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(mockUser);
    jest.spyOn(prisma.users, 'update').mockResolvedValue(mockUser);
    jest.spyOn(jwt, 'verify').mockImplementation(() => ({ userId: 1 }));

    const result = await service.refreshToken({
      refresh: 'refreshToken',
    });

    expect(result).toEqual({
      access: expect.any(String),
      refresh: expect.any(String),
    });
  });

  it('should throw an error for invalid refresh token', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new jwt.JsonWebTokenError('Invalid token');
    });

    await expect(
      service.refreshToken({ refresh: 'invalidToken' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw an error for invalid login credentials', async () => {
    jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(null);

    await expect(
      service.signin({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw an error for an invalid JWT token', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new jwt.JsonWebTokenError('invalid token');
    });

    await expect(
      service.refreshToken({ refresh: 'invalidToken' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw an error for an expired JWT token', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new jwt.TokenExpiredError('jwt expired', new Date());
    });

    await expect(
      service.refreshToken({ refresh: 'expiredToken' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
