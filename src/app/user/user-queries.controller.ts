import { Query, GraphQLNonNull, Scope, Type, GraphQLObjectType, Mutation, GapiController, Service, GraphQLInt, Inject } from "gapi";
import { UserService } from './services/user.service';
import { UserType } from './types/user.type';

@GapiController()
export class UserQueriesController {
    @Inject() userService: UserService;

    @Scope('ADMIN')
    @Type(UserType)
    @Query({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    findUser(root, { id }, context) {
        console.log(this);
        return UserService.findUser(id);
    }

}
