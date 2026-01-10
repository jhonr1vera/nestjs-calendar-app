import { devEnviroment, prodEnviroment, testEnviroment } from "src/shared/global/api.constants";

export class ApiUtil {

    static isDevEnvironment() {
        return process.env.ENVIRONMENT === devEnviroment;
    }

    static isTestEnvironment() {
        return process.env.ENVIRONMENT === testEnviroment;
    }

    static isProductionEnvironment() {
        return process.env.ENVIRONMENT === prodEnviroment;
    }
}
