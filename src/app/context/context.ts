import { User } from "../user/user";

export interface ParameterType {
    name: string;
    field: string;
}

export interface ContextDetailModel {
    id: number;
    ruleDevelopers: Array<RuleDeveloper>;
    businessrules: Array<BusinessItem>;
    businessTerms: Array<BusinessItem>;
}

// BusinessItems represents Rules and Terms.
export interface BusinessItem {
    id: number;
    name: string;
    description: string;
}

export interface RuleDeveloper {
    id: number;
    name: string;
}
