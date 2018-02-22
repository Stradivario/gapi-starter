
import { GapiModule, GapiServerModule, Service } from 'gapi';
import { CoffeMachineModule } from './coffe-machine/coffe-machine.module';
import { UserModule } from './user/user.module';

@GapiModule({
    imports: [
        GapiServerModule.forRoot({
            port: '5050'
        }),
        CoffeMachineModule,
        UserModule
    ]
})
export class AppModule { }
