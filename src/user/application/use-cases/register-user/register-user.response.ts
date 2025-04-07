import { User } from '@src/user/domain/entities/user.entity';

export interface RegisterUserResponse {
  user: User;
  token: string;
}
