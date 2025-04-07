import { RegisterUserRequest } from '@src/user/application/use-cases/register-user/register-user.request';
import { CreateUserInput } from './create-user-input';

export class User {
  private constructor(
    public id: string | undefined,
    public fullname: string,
    public email: string,
    readonly password: string,
    public isActive: boolean = true,
    public roles: string[] = ['user'],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  static create({ fullname, email, password }: CreateUserInput): User {
    const id = crypto.randomUUID();
    return new User(id, fullname, email, password);
  }

  public static createExisting({
    id,
    fullname,
    email,
    password,
    isActive,
    roles,
    createdAt,
    updatedAt,
  }: CreateUserInput): User {
    return new User(
      id,
      fullname,
      email,
      password,
      isActive,
      roles,
      createdAt,
      updatedAt,
    );
  }
}
