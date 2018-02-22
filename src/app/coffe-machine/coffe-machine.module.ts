import { GapiModule } from 'gapi';
import { CoffeMakerService } from './services/coffe-maker.service';
import { BeanFactory } from './services/bean-factory.service';

@GapiModule({
    services: [
        CoffeMakerService,
        BeanFactory
    ]
})
export class CoffeMachineModule {}