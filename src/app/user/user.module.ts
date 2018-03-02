
import { GapiModule } from 'gapi';
import { UserQueriesController } from './user-queries.controller';
import { UserSubscriptionsController } from './user-subscriptions.controller';
import { UserMutationsController } from './user-mutations.controller';


@GapiModule({
    controllers: [
        UserQueriesController,
        UserSubscriptionsController,
        UserMutationsController
    ]
})
export class UserModule {}