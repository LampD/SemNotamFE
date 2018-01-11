import { User } from "../user/user";

export interface ParameterType {
    name: string;
    field: string;
}

export interface Context {
    name: string;
    children: Array<Context>;
    parameterValues: Map<String, String> ;
}

export interface ContextDetailModel {
    id: number;
    ruleDevelopers: Array<RuleDeveloper>;
    businessrules: Array<BusinessRule>;
    businessTerms: Array<BusinessRule>;
}

// BusinessItems represents Rules and Terms.
export interface BusinessRule {
    id: string;
    body: string;
}

export interface RuleDeveloper {
    id: number;
    name: string;
}

export interface ParameterTypeValues {
    name: string;
    values: Array<Value>;
}

export interface Value{
    value: string;
}
