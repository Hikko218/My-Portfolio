import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserService (sqlite memory)', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create, findOne, update, delete (happy path)', async () => {
    // create
    const created = await service.create({
      username: 'testuser',
      password: 'pw',
    });
    expect(created).toMatchObject({ username: 'testuser' });

    // findOne
    const user = await service.findOne(created.id);
    expect(user).toBeDefined();
    expect(user && user.username).toBe('testuser');

    // update
    const updated = await service.update(created.id, {
      username: 'updated',
      password: 'pw',
    });
    expect(updated).toMatchObject({ username: 'updated' });

    // delete
    const del = await service.delete(created.id);
    expect(del).toEqual({ deleted: true });
    const afterDelete = await service.findOne(created.id);
    expect(afterDelete).toBeNull();
  });

  it('update throws if not found', async () => {
    await expect(
      service.update(999, { username: 'x', password: 'pw' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('delete throws if not found', async () => {
    await expect(service.delete(999)).rejects.toThrow(NotFoundException);
  });
});
