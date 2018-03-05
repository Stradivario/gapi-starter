import { Query, GraphQLNonNull, Scope, Type, GraphQLObjectType, Mutation, GapiController, Service, GraphQLInt, Container, Injector } from "gapi";
import { UserService } from './services/user.service';
import { UserObjectType, UserType } from './types/user.type';

@GapiController()
export class UserQueriesController {

    @Injector(UserService) private userService: UserService;

    @Type(UserObjectType)
    @Query({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    findUser(root, { id }, context): UserType  {
        return this.userService.findUser(id);
    }

}




