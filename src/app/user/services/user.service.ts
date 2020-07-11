import { Service } from '@rxdi/core';
import { IUserType } from '../../core/api-introspection';

@Service()
export class UserService {
  constructor() {}

  findUser(id: number): IUserType {
    return {
      id: 1,
      email: 'test@gmail.com',
      type: 'ADMIN',
      password: '123456',
      name: 'Pesho',
      settings: {
        sidebar: true
      }
    };
  }

  addUser(id: number): IUserType {
    return {
      id: 1,
      email: 'test@gmail.com',
      type: 'ADMIN',
      password: '123456',
      name: 'Pesho',
      settings: {
        sidebar: true
      }
    };
  }

  deleteUser(id: number): IUserType {
    return {
      id: 1,
      email: 'test@gmail.com',
      type: 'ADMIN',
      password: '123456',
      name: 'Pesho',
      settings: {
        sidebar: true
      }
    };
  }

  updateUser(id): IUserType {
    return {
      id: 1,
      email: 'test@gmail.com',
      type: 'ADMIN',
      password: '123456',
      name: 'Pesho',
      settings: {
        sidebar: true
      }
    };
  }
}
