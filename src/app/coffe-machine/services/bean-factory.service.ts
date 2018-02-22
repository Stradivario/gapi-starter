import {Service} from "typedi";

@Service()
export class BeanFactory {
    create() {
        return 5;
    }
}