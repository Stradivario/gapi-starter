import { Query, GraphQLNonNull, Type, GapiController, GraphQLInt, GraphQLString } from '@gapi/core';
import { UserService } from './services/user.service';
import { UserObjectType } from './types/user.type';
import { UserTokenObjectType } from './types/user-login.type';
import { AuthPrivateService } from '../core/services/auth/auth.service';
import { IUserType, IUserTokenType } from '../core/api-introspection/index';

@GapiController()
export class UserQueriesController {

    constructor(
        private userService: UserService,
        private authService: AuthPrivateService
    ) { }

    @Type(UserObjectType)
    @Query({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    findUser(root, { id }, context): IUserType {
        return this.userService.findUser(id);
    }

    @Type(UserTokenObjectType)
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
