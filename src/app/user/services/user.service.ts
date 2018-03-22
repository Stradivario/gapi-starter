import { Service } from '@gapi/core';
import { IUserType } from '../../core/api-introspection';



@Service()
export class UserService {
    constructor(
    ) { }

    findUser(id: number): IUserType {
        return {
            id: 1,
            settings: {
                firstname: 'pesho',
                username: 'gosho',
            }
        };
    }

    addUser(id: number): IUserType {
        return {
            id: 1,
            settings: {
                firstname: 'pesho',
                username: 'gosho',
            }
        };
    }

    deleteUser(id: number): IUserType {
        return {
            id: 1,
            settings: {
                firstname: 'pesho',
                username: 'gosho',
            }
        };
    }

    updateUser(id): IUserType {
        return {
            id: 1,
            settings: {
                firstname: 'pesho',
                username: 'gosho',
            }
        };
    }

}