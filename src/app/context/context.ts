import { User } from "../user/user";

export interface Context {
    name: string;
    children: Array<Context>;
    parameterValues: Map<String, String> ;
}

export interface ContextDetailModel {
    name: string;
    ruleDevelopers: Array<User>;
    rules: Array<BusinessRule>;
    parameterValues: Map<String, String> ;
}

// BusinessItems represents Rules and Terms.
export interface BusinessRule {
    id: string;
    body: string;
}
