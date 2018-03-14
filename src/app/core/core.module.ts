
import { GapiModule, ConfigService } from 'gapi';
import { AuthPrivateService } from './services/auth/auth.service';
import { readFileSync } from 'fs';

@GapiModule({
    services: [
        AuthPrivateService
    ]
})
export class CoreModule {}