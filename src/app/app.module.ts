
import { GapiModule, GapiServerModule, ConfigService } from 'gapi';
import { UserModule } from './user/user.module';
import { UserService } from './user/services/user.service';

@GapiModule({
    imports: [
        UserModule
    ],
    services: [
        ConfigService.forRoot({
            APP_CONFIG: {
                port: 8200
            }
        })
    ]
})
export class AppModule { }