import { GapiController, Container, Query, Mutation, Args, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLObjectTypeConfig, GraphQLObjectType, Type, Scope, ControllerMappingSettings, ControllerMapping, GenericGapiResolversType } from 'gapi';
import { UserType } from './types/user.type';
import { TestService } from './services/test.service';
import { Service } from 'gapi';

@GapiController({
    scope: ['ADMIN'],
    public: true
})
export class UserController implements GapiController {

    _controller_name: string;
    _settings: ControllerMappingSettings;
    _queries: Map<string, GenericGapiResolversType>;
    _subscriptions: Map<string, GenericGapiResolversType>;
    _mutations: Map<string, GenericGapiResolversType>;

    constructor(
        public testService: TestService
    ) {
        console.log('EEEEEEEEEEEEEEEEEEE ', this);
    }

    @Scope('ADMIN')
    @Type(UserType)
    @Query({
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
    findUser(root, args, context: any) {
        return Promise.resolve({id: 1, friendId: 2});
    }
    
    @Scope('ADMIN')
    @Type(UserType)
    @Query({
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
    findUser2(root, args, context: any) {
        return Promise.resolve({id: 1, friendId: 2});
    }

    @Scope('ADMIN')
    @Type(UserType)
    @Mutation({
        message: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userId: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        friendId: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
    })
    deleteUser(root, payload, context: any): any {
        return Promise.resolve(1);
    }

}

