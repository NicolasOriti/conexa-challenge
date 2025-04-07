import { User } from '@src/user/domain/entities/user.entity';
import { UserPersistence } from '../persistence/typeorm-user.persistence';

export class UserOrmMapper {
  static toDomain(orm: UserPersistence): User {
    return User.createExisting({
      id: orm.id,
      fullname: orm.fullname,
      email: orm.email,
      password: orm.password,
      isActive: orm.isActive,
      roles: orm.roles,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toOrm(domain: User): UserPersistence {
    const orm = new UserPersistence();
    orm.fullname = domain.fullname;
    orm.email = domain.email;
    orm.password = domain.password;
    orm.isActive = true;
    orm.roles = ['user'];
    return orm;
  }
}
