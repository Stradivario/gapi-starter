
import { GapiModule, ConfigService } from 'gapi';
import { AuthPrivateService } from './services/auth/auth.service';
import { readFileSync } from 'fs';

@GapiModule({
    services: [
        ConfigService.forRoot({
            AMQP_CONFIG: {
                host: '182.10.0.5',
                port: 5672
            },
            APP_CONFIG: {
                port: process.env.API_PORT || 9000,
                cert: readFileSync('./cert.key'),
                graphiql: true,
                graphiqlToken: process.env.GRAPHIQL_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtyaXN0aXFuLnRhY2hldkBnbWFpbC5jb20iLCJpZCI6MSwic2NvcGUiOlsiQURNSU4iXSwiaWF0IjoxNTIwMjkxMzkyfQ.9hpIDPkSiGvjTmUEyg_R_izW-ra2RzzLbe3Uh3IFsZg'
            },
        }),
        AuthPrivateService
    ]
})
export class CoreModule {}