import { UserController } from '../src/controllers/user.controller';
import { UserService } from '../src/services/user.service';
import { HttpStatus } from '@nestjs/common';
import { UserModule } from '../src/modules/user.module';
import { Test } from '@nestjs/testing';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  const testEmail = 'test@gmail.com';
  let userId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();
    userService = moduleRef.get(UserService);
    userController = moduleRef.get(UserController);
  });

  describe('createUser', () => {
    it('should return a user', async () => {
      const result = {
        status: HttpStatus.CREATED,
        item: {
          id: 'fake_id',
          coins: 0,
          roles: ['user'],
          username: 'test',
          email: testEmail,
          phone: '1234567890',
        },
      };

      const createUserSpy = jest.spyOn(userService, 'createUser');
      const user = await userController.createUser({
        username: 'test',
        email: testEmail,
        phone: '1234567890',
      });

      userId = user.item.id;

      expect(createUserSpy).toBeCalled();
      expect(user.item.email).toBe(result.item.email);
    });

    it('should return already created', async () => {
      const result = {
        status: HttpStatus.CONFLICT,
        message: 'User already exists',
        item: null,
      };

      const createUserSpy = jest.spyOn(userService, 'createUser');
      const user = await userController.createUser({
        username: 'test',
        email: testEmail,
        phone: '234567891',
      });

      expect(createUserSpy).toBeCalled();
      expect(user.status).toBe(result.status);
      expect(user.message).toBe(result.message);
      expect(user.item).toBe(result.item);
    });

    it('should return find user by credentials', async function () {
      const findUserSpy = jest.spyOn(userService, 'getUserByCredentials');
      const user = await userController.getUserByCredentials({
        email: testEmail,
      });

      expect(findUserSpy).toBeCalled();
      expect(user.item.email).toBe(testEmail);
    });

    it('should return find user by id', async function () {
      const findUserSpy = jest.spyOn(userService, 'getUserById');
      const user = await userController.getUserById({ id: userId });

      expect(findUserSpy).toBeCalled();
      expect(user.status).toBe(HttpStatus.OK);
      expect(user.item.id).toBe(userId);
      expect(user.item.email).toBe(testEmail);
    });

    it('should return find users', async function () {
      const findUsersSpy = jest.spyOn(userService, 'getUsers');
      const users = await userController.getUsers({
        limit: 10,
        offset: 0,
      });

      expect(findUsersSpy).toBeCalled();
      expect(users.status).toBe(HttpStatus.OK);
      expect(users.items.length).toBe(1);
      expect(users.items[0].id).toBe(userId);
    });

    it('should return add coins to user', async function () {
      const addCoinsSpy = jest.spyOn(userService, 'addCoinsUser');
      const user = await userController.addCoinsUser({
        userId: userId,
        coins: 100,
      });

      expect(addCoinsSpy).toBeCalled();
      expect(user.status).toBe(HttpStatus.OK);
      expect(user.item.id).toBe(userId);
      expect(user.item.email).toBe(testEmail);
      expect(user.item.coins).toBe(100);
    });

    it('should not add coins to non existing user', async function () {
      const addCoinsSpy = jest.spyOn(userService, 'addCoinsUser');
      const user = await userController.addCoinsUser({
        userId: 'fake_id',
        coins: 100,
      });

      expect(addCoinsSpy).toBeCalled();
      expect(user.status).toBe(HttpStatus.NOT_FOUND);
      expect(user.message).toBe('User not found');
    });

    it('should return remove coins to user', async function () {
      const removeCoinsSpy = jest.spyOn(userService, 'removeCoinsUser');
      const user = await userController.removeCoinsUser({
        userId: userId,
        coins: 50,
      });

      expect(removeCoinsSpy).toBeCalled();
      expect(user.status).toBe(HttpStatus.OK);
      expect(user.item.id).toBe(userId);
      expect(user.item.email).toBe(testEmail);
      expect(user.item.coins).toBe(50);
    });
  });

  // Delete all users
  afterAll(async () => {
    await userService.deleteUserById(userId);
  });
});
