```typescript

import { GapiController, Container, Query, Mutation, Args, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLObjectTypeConfig, GraphQLObjectType, Type, Scope, ControllerMappingSettings, ControllerMapping, GenericGapiResolversType } from 'gapi';
import { UserType } from './types/user.type';
import { TestService } from './services/test.service';
import { Service } from 'gapi';
import { Inject } from '../../../../gapi/node_modules/typedi';

@GapiController({
    type: UserType,
    scope: ['ADMIN', 'USER']
})
@Service()
export class UserController implements GapiController {

    _controller_name: string;
    _settings: ControllerMappingSettings;
    _queries: Map<string, GenericGapiResolversType>;
    _subscriptions: Map<string, GenericGapiResolversType>;
    _mutations: Map<string, GenericGapiResolversType>;

    constructor(@Inject(type => TestService) private testService: TestService) {
        console.log(this.testService);
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


```