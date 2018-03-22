
import { GapiModule } from '@gapi/core';
import { AuthPrivateService } from './services/auth/auth.service';

@GapiModule({
    services: [
        AuthPrivateService
    ]
})
export class CoreModule {}