import { TypeOrmUserRepository } from '@src/user/infrastructure/repositories/typeorm-user.repository';
import { Repository } from 'typeorm';
import { UserPersistence } from '@src/user/infrastructure/persistence/typeorm-user.persistence';
import { UserOrmMapper } from '@src/user/infrastructure/mappers/user.mapper';
import { User } from '@src/user/domain/entities/user.entity';

jest.mock('@src/user/infrastructure/mappers/user.mapper');

describe('TypeOrmUserRepository', () => {
  let repository: TypeOrmUserRepository;
  let ormRepo: jest.Mocked<Repository<UserPersistence>>;

  beforeEach(() => {
    jest.clearAllMocks();

    ormRepo = {
      save: jest.fn(),
      findOne: jest.fn(),
    } as any;

    repository = new TypeOrmUserRepository(ormRepo);
  });

  const domainUser = User.createExisting({
    id: '123',
    fullname: 'Han Solo',
    email: 'han@falcon.com',
    password: 'blaster',
    roles: ['user'],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const persistenceUser: UserPersistence = {
    id: '123',
    fullname: 'Han Solo',
    email: 'han@falcon.com',
    password: 'blaster',
    roles: ['smuggler'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    normalizeEmailBeforeInsert: () => {},
    normalizeEmailBeforeUpdate: () => {},
  };

  it('should save a user', async () => {
    (UserOrmMapper.toOrm as jest.Mock).mockReturnValue(persistenceUser);

    await repository.save(domainUser);

    expect(UserOrmMapper.toOrm).toHaveBeenCalledWith(domainUser);
    expect(ormRepo.save).toHaveBeenCalledWith(persistenceUser);
  });

  it('should return a user by email', async () => {
    ormRepo.findOne.mockResolvedValue(persistenceUser);
    (UserOrmMapper.toDomain as jest.Mock).mockReturnValue(domainUser);

    const result = await repository.findByEmail('han@falcon.com');

    expect(ormRepo.findOne).toHaveBeenCalledWith({
      where: { email: 'han@falcon.com' },
      select: {
        email: true,
        password: true,
        id: true,
        fullname: true,
        isActive: true,
        roles: true,
      },
    });

    expect(result).toEqual(domainUser);
  });

  it('should return null if no user is found', async () => {
    ormRepo.findOne.mockResolvedValue(null);

    const result = await repository.findByEmail('notfound@nowhere.com');

    expect(result).toBeNull();
    expect(UserOrmMapper.toDomain).not.toHaveBeenCalled();
  });
});
