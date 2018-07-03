import { Module } from "@rxdi/core";
import { AppQueriesController } from "./app.controller";

@Module({
    controllers: [AppQueriesController]
})
export class AppModule { }