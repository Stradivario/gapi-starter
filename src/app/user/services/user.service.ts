import { Service } from "gapi";


@Service()
export class UserService {

    public static findUser(id: number) {
        return { id: 1 };
    }

    public static addUser(id: number) {
        return { id: 1 };
    }

    public static deleteUser(id: number) {
        return { id: 1 };
    }

    public static updateUser(id) {
        return { id: 1 };
    }

    public static subscribeToUserUpdates() {
        return { id: 1 };
    }

}