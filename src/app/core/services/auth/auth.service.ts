import { Service, ConnectionHookService, AuthService, Injector, Container } from "gapi";
import * as Boom from 'boom';

@Service()
export class AuthPrivateService {

    @Injector(AuthService) private authService: AuthService
    @Injector(ConnectionHookService) private connectionHookService: ConnectionHookService

    constructor() {
        this.connectionHookService.modifyHooks.onSubConnection = this.onSubConnection.bind(this);
        this.authService.modifyFunctions.validateToken = this.validateToken.bind(this);
    }

    onSubConnection(connectionParams) {
        if (connectionParams.token) {
            return this.authService.modifyFunctions.validateToken(connectionParams.token);
        } else {
            throw Boom.unauthorized();
        }
    }

    validateToken(token: string) {
        const userVerifiedInfo = this.authService.verifyToken(token);
        const user: {type?: string} = Object.assign(userVerifiedInfo);
        user.type = userVerifiedInfo.scope[0];
        if (user) {
            return user;
        } else {
            throw Boom.unauthorized();
        }
    }
}
