import { Reflector } from '@nestjs/core';
import {
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UserRoleGuard } from '@src/user/infrastructure/guards/user-role.guard';
import { META_ROLES } from '@src/user/infrastructure/decorators/role-protected.decorator';
import { User } from '@src/user/domain/entities/user.entity';

describe('UserRoleGuard', () => {
  let guard: UserRoleGuard;
  let reflector: jest.Mocked<Reflector>;
  let context: jest.Mocked<ExecutionContext>;

  beforeEach(() => {
    reflector = {
      get: jest.fn(),
    } as any;

    context = {
      getHandler: jest.fn(),
      switchToHttp: jest.fn(),
    } as any;

    guard = new UserRoleGuard(reflector);
  });

  const mockRequest = (user?: Partial<User>) => ({
    user,
  });

  const setRequestInContext = (req: any) => {
    context.switchToHttp.mockReturnValue({
      getRequest: () => req,
    } as any);
  };

  it('should allow if no roles are defined (undefined)', () => {
    reflector.get.mockReturnValue(undefined);
    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should allow if roles array is empty', () => {
    reflector.get.mockReturnValue([]);
    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should allow if user has one of the valid roles', () => {
    reflector.get.mockReturnValue(['admin']);
    const user: User = {
      id: '1',
      email: 'test@mail.com',
      fullname: 'Test User',
      password: '',
      roles: ['admin'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setRequestInContext(mockRequest(user));

    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw ForbiddenException if user lacks valid roles', () => {
    reflector.get.mockReturnValue(['admin']);
    const user: User = {
      id: '1',
      email: 'test@mail.com',
      fullname: 'Test User',
      password: '',
      roles: ['user'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setRequestInContext(mockRequest(user));

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should throw BadRequestException if user is missing from request', () => {
    reflector.get.mockReturnValue(['admin']);
    setRequestInContext(mockRequest(undefined));

    expect(() => guard.canActivate(context)).toThrow(BadRequestException);
  });
});
