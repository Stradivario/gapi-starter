import { AppModule } from './app/app.module';
import { BootstrapFramework } from '@rxdi/core';
import { FrameworkImports } from './framework-imports';

BootstrapFramework(AppModule, [FrameworkImports], {
  experimental: {
    showModuleWithDependencies: true
  },
  logger: {
    logging: true,
    date: true,
    exitHandler: true,
    fileService: true,
    hashes: true
  }
}).subscribe(() => console.log('Started!'), e => console.error(e));
