import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@src/user/domain/repositories/user.repository';
import { UserPersistence } from '../persistence/typeorm-user.persistence';
import { Repository } from 'typeorm';
import { UserOrmMapper } from '../mappers/user.mapper';
import { User } from '@src/user/domain/entities/user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserPersistence)
    private readonly repository: Repository<UserPersistence>,
  ) {}

  async save(user: User): Promise<void> {
    const ormEntity = UserOrmMapper.toOrm(user);
    await this.repository.save(ormEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userPersistence = await this.repository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        fullname: true,
        isActive: true,
        roles: true,
      },
    });

    if (!userPersistence) return null;

    return userPersistence ? UserOrmMapper.toDomain(userPersistence) : null;
  }
}
