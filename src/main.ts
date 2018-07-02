import { AppModule } from './app/app.module';
import { BootstrapFramework } from '@rxdi/core';
import { CoreModule } from '@gapi/core';

BootstrapFramework(AppModule, [CoreModule], {
    init: false,
    initOptions: {
        effects: true,
        plugins: true,
        services: true,
        controllers: true
    },
    logger: {
        logging: true,
        date: true,
        exitHandler: true,
        fileService: true,
        hashes: true
    }
})
.subscribe(
    () => console.log('Started!'),
    (e) => console.error(e)
);