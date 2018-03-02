import { Query, GraphQLNonNull, Scope, Type, GraphQLObjectType, Mutation, GapiController, Service, GraphQLInt } from "gapi";
import { UserService } from './services/user.service';
import { UserType } from './types/user.type';

@GapiController()
export class UserMutationsController {

    @Scope('ADMIN')
    @Type(UserType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    deleteUser(root, { id }, context) {
        return UserService.deleteUser(id);
    }

    @Scope('ADMIN')
    @Type(UserType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    updateUser(root, { id }, context) {
        return UserService.updateUser(id);
    }

    @Scope('ADMIN')
    @Type(UserType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    addUser(root, { id }, context) {
        return UserService.addUser(id);
    }

}
