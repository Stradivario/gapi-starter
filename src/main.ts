import { BootstrapFramework } from '@gapi/core';
import { AppModule } from './app/app.module';
import { FrameworkImports } from './framework-imports';

BootstrapFramework(AppModule, [FrameworkImports])
    .subscribe(
        () => console.log('Started'),
        (e) => console.error(e)
    );