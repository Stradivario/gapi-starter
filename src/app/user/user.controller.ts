import { GapiController, Container, Query, Mutation, Args, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLObjectTypeConfig, GraphQLObjectType, Type, Scope } from 'gapi';
import { UserType } from './types/user.type';

@GapiController({
    type: new GraphQLObjectType(<any>UserType),
    scope: ['ADMIN', 'USER']
})
export class UserController {

    @Scope('ADMIN')
    @Type(UserType)
    @Query({
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
    findUser(root, args, context: any) {
        console.log('JUST ARGUMENTS', args, this);
        return Promise.resolve({id: 1, friendId: 2});
    }

    // @Args({
    //     message: new GraphQLNonNull(GraphQLString),
    //     userId: new GraphQLNonNull(GraphQLInt),
    //     friendId: new GraphQLNonNull(GraphQLInt),
    //     email: new GraphQLNonNull(GraphQLString)
    // })
    // @Mutation()
    deleteUser(root, payload, context: any): any {
        return Promise.resolve(1);
    }

}

