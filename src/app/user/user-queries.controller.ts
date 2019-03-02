import { Controller, Service } from '@rxdi/core';
import { Type, Query, Public, GenericGapiResolversType, InterceptResolver, Interceptor } from '@rxdi/graphql';
import { GraphQLNonNull, GraphQLInt, GraphQLString,  } from 'graphql';
import { UserService } from './services/user.service';
import { UserType } from './types/user.type';
import { UserTokenType } from './types/user-login.type';
import { AuthService } from '../core/services/auth/auth.service';
import { IUserType, IUserTokenType } from '../core/api-introspection/index';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Service()
export class LoggerInterceptor implements InterceptResolver {
    intercept(
        chainable$: Observable<UserType>,
        context: UserType,
        payload,
        descriptor: GenericGapiResolversType
    ) {
        console.log('Before...');
        const now = Date.now();
        return chainable$.pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
            map(res => {
                res.email = 'dadadada';
                return res;
            })
        );
    }
}

@Controller()
export class UserQueriesController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Type(UserType)
    @Interceptor(LoggerInterceptor)
    @Public()
    @Query({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    findUser(root, { id }, context): IUserType {
        console.log(this);
        return this.userService.findUser(id);
    }

    @Type(UserTokenType)
    @Public()
    @Query({
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
    login(root, { email, password }, context) {
        let credential: IUserTokenType;

        // Find user from database
        const user = <IUserType>{
            id: 1,
            email: email,
            type: 'ADMIN',
            settings: {
                sidebar: true
            },
            password: this.authService.encryptPassword(password),
            name: 'Test Testov'
        };

        if (this.authService.decryptPassword(user.password) === password) {
            credential = {
                user: user,
                token: this.authService.signJWTtoken({
                    email: user.email,
                    id: user.id,
                    scope: [user.type]
                })
            };
        } else {
            throw new Error('missing-username-or-password');
        }
        return credential;
    }

}
