
import { Service } from '@rxdi/core';
import * as Boom from 'boom';

export interface UserInfo {
    scope: ['ADMIN', 'USER'];
    type: 'ADMIN' | 'USER';
    iat: number;
}

@Service()
export class AuthPrivateService {

    constructor(
        // private authService: AuthService,
        // private connectionHookService: ConnectionHookService
    ) {
        // this.connectionHookService.modifyHooks.onSubConnection = this.onSubConnection.bind(this);
        // this.authService.modifyFunctions.validateToken = this.validateToken.bind(this);
    }

    onSubConnection(connectionParams): UserInfo {
        if (connectionParams.token) {
            return this.validateToken(connectionParams.token, 'Subscription');
        } else {
            throw Boom.unauthorized();
        }
    }

    validateToken(token: string, requestType: 'Query' | 'Subscription' = 'Query'): UserInfo {
        const user = <UserInfo>this.verifyToken(token);
        user.type = user.scope[0];
        console.log(`${requestType} from: ${JSON.stringify(user)}`);
        if (user) {
            return user;
        } else {
            throw Boom.unauthorized();
        }
    }

    verifyToken(token: string): any {
        // return this.authService.verifyToken(token);
    }

    signJWTtoken(tokenData: any): any {
        // return this.authService.sign(tokenData);
    }

    issueJWTToken(tokenData: any) {
        // const jwtToken = this.authService.sign({
        //     email: '',
        //     id: 1,
        //     scope: ['ADMIN', 'USER']
        // });
        // return jwtToken;
    }

    decryptPassword(password: string): any {
        // return this.authService.decrypt(password);
    }

    encryptPassword(password: string): any {
        // return this.authService.encrypt(password);
    }

}
