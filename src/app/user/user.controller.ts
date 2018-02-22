import { GapiController, Container, Query, Mutation, Type, Scope, Args } from 'gapi';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import { UserType } from './types/user.type';

@GapiController()
export class UserController {
    constructor() {
        console.log(this.findUser(1));
    }

    @Type(UserType)
    @Scope('USER', 'ADMIN')
    @Args({
        id: new GraphQLNonNull(GraphQLInt)
    })
    @Query
    findUser(id) {
        return Promise.resolve(1);
    }

    @Type(UserType)
    @Scope('USER', 'ADMIN')
    @Args({
        message: new GraphQLNonNull(GraphQLString),
        userId: new GraphQLNonNull(GraphQLInt),
        friendId: new GraphQLNonNull(GraphQLInt),
        email: new GraphQLNonNull(GraphQLString)
    })
    @Mutation
    deleteUser(root, { email, friendId, userId, message }, context: any) {
        return Promise.resolve(1);
    }

}
Container.get(UserController);