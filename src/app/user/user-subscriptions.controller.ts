import { Query, GraphQLNonNull, Scope, Type, GraphQLObjectType, Mutation, GapiController, Service, Container, Injector } from "gapi";
import { UserService } from './services/user.service';

@GapiController()
export class UserSubscriptionsController {

    @Injector(UserService) private userService: UserService;
    
    subscribeToUserUpdates() {
        return this.userService.subscribeToUserUpdates();
    }

}
