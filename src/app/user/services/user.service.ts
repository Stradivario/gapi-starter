import { Service } from 'gapi';
import { UserType } from '../types/user.type';

@Service()
export class AnotherService {
    trimFirstLetter(username: string): string {
        return username.charAt(1);
    }

    trimFirstLetterAsync(username): Promise<string> {
        return Promise.resolve(this.trimFirstLetter(username));
    }
}

@Service()
export class UserService {
    constructor(
        private anotherService: AnotherService
    ) {}

    findUser(id: number): UserType {
        return { id: 1, settings: {
            firstname: 'pesho',
            username: 'gosho'
        }};
    }

    addUser(id: number): UserType {
        const username = this.anotherService.trimFirstLetter('username');
        return { id: 1, settings: {
            firstname: 'pesho',
            username: 'gosho'
        }};
    }

    deleteUser(id: number): UserType {
        return { id: 1, settings: {
            firstname: 'pesho',
            username: 'gosho'
        }};
    }

    updateUser(id): UserType  {
        return { id: 1, settings: {
            firstname: 'pesho',
            username: 'gosho'
        }};
    }

}