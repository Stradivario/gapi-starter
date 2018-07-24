import { Module } from "@gapi/core";
import { AppQueriesController } from "./app.controller";

@Module({
    controllers: [AppQueriesController]
})
export class AppModule { }