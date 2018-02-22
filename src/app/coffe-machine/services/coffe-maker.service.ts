import {Service} from "typedi";
import { BeanFactory } from "./bean-factory.service";


@Service()
export class CoffeMakerService {

    constructor(
        private beanFactory: BeanFactory
    ) {}

    make() {
        this.beanFactory.create();
    }

}