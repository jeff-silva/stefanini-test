import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn(() => ({ Items: [], Count: 0, ScannedCount: 0 })),
    create: jest.fn((dto) => ({ id: Date.now().toString(), ...dto })),
    findOne: jest.fn((id) => ({ id, name: 'John', age: 30, position: 'Dev' })),
    update: jest.fn((id, dto) => ({ ...dto, id })),
    delete: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should findAll user', async () => {
    expect(controller.findAll()).toEqual({
      Items: [],
      Count: 0,
      ScannedCount: 0,
    });
  });

  it('should create a user', async () => {
    const dto = { name: 'John', age: 35, position: 'Dev' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(String),
      ...dto,
    });
  });

  it('should findOne user', async () => {
    expect(controller.findOne('abc')).toEqual({
      id: 'abc',
      name: expect.any(String),
      age: expect.any(Number),
      position: expect.any(String),
    });
  });

  it('should update user', async () => {
    const dto = { name: 'John', age: 35, position: 'Dev' };
    expect(controller.update('abc', dto)).toEqual({ id: 'abc', ...dto });
  });

  it('should delete user', async () => {
    expect(controller.delete('abc')).toEqual({ id: 'abc' });
  });
});
