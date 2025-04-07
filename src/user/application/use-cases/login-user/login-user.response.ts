import { User } from '@src/user/domain/entities/user.entity';

export class LoginUserResponse {
  user: {
    id: string;
    email: string;
    fullname: string;
    roles: string[];
  };
  token: string;

  constructor(user: User, token: string) {
    this.user = {
      id: user.id!,
      email: user.email,
      fullname: user.fullname,
      roles: user.roles,
    };
    this.token = token;
  }
}
