import { Query, GraphQLNonNull, Scope, Type, GraphQLObjectType, Mutation, GapiController, Service, GraphQLInt, Container, Injector } from "gapi";
import { UserService } from './services/user.service';
import { UserObjectType, UserType } from './types/user.type';

@GapiController()
export class UserMutationsController {

    @Injector(UserService) private userService: UserService;

    @Scope('ADMIN')
    @Type(UserObjectType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    deleteUser(root, { id }, context): UserType  {
        return this.userService.deleteUser(id);
    }

    @Scope('ADMIN')
    @Type(UserObjectType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    updateUser(root, { id }, context): UserType {
        return this.userService.updateUser(id);
    }

    @Scope('ADMIN')
    @Type(UserObjectType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    addUser(root, { id }, context): UserType  {
        return this.userService.addUser(id);
    }

}
