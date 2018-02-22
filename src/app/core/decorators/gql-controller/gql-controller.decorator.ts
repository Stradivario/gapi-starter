import 'reflect-metadata';
import { GQLControllerArguments } from "./gql-controller.decorator.interface";
import { GQLControllerSymbol } from './gql-controller.symbol';
export class TestenClass2 {
    constructor() {
        // console.log(this);
    }
    get() {
        console.log('get');
    }

    set() {

    }
}
export function GQLController(options?: GQLControllerArguments) {
    return (target: any) => {
        const original = target;
        function construct(constructor, args) {
            const c: any = function () {
                // this.testenClass2 = new TestenClass2();
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            return new c();
        }
        const f: any = function (...args) {
            console.log('Loaded Module: ' + original.name);
            return construct(original, args);
        };
        f.prototype = original.prototype;
        f.prototype.testenClass2 = new TestenClass2();
        Reflect.defineMetadata(GQLControllerSymbol, options, f);
        return f;
    };
}