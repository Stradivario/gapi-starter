
import { GapiModule } from 'gapi';
import { AuthPrivateService } from './services/auth/auth.service';

@GapiModule({
    services: [
        AuthPrivateService
    ]
})
export class CoreModule {}