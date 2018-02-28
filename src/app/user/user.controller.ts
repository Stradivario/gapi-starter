import { GapiController, Container, Query, Mutation, Args, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLObjectTypeConfig, GraphQLObjectType } from 'gapi';
import { UserType } from './types/user.type';

@GapiController({
    type: new GraphQLObjectType(<any>UserType),
    scope: ['ADMIN', 'USER']
})
export class UserController {

    @Query({
        id: new GraphQLNonNull(GraphQLInt)
    })
    findUser(root, args, context: any) {
        console.log('JUST ARGUMENTS', args);
        return Promise.resolve(1);
    }

    @Args({
        message: new GraphQLNonNull(GraphQLString),
        userId: new GraphQLNonNull(GraphQLInt),
        friendId: new GraphQLNonNull(GraphQLInt),
        email: new GraphQLNonNull(GraphQLString)
    })
    @Mutation()
    deleteUser(root, payload, context: any): any {
        return Promise.resolve(1);
    }

}

