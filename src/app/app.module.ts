
import { GapiModule, GapiServerModule } from 'gapi';
import { UserModule } from './user/user.module';
import { UserService } from './user/services/user.service';

@GapiModule({
    imports: [
        UserModule
    ]
})
export class AppModule {}