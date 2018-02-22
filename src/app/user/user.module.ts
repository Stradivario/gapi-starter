import { GapiModule } from "gapi";
import { UserController } from "./user.controller";

@GapiModule({
    controllers: [
        UserController
    ]
})
export class UserModule {}