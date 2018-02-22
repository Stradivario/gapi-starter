
import { AppModule } from './app/app.module';
import { Bootstrap } from './app/core/utils';





declare global {
    namespace NodeJS {
        interface Global {
            imports: {
                [key: string]: any;
            }
        }
    }
}

Bootstrap(AppModule);
