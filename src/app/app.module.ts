import { GQLModule, GQLController, TestenClass2 } from './core';

@GQLController()
export class TestenImport {
    constructor(testenClass2: TestenClass2) {
        this['testenClass2'].get()
    }
    public static dada() {

    }
}

@GQLModule({
    imports: [
        TestenImport
    ]
})
export class AppModule {}