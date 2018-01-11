export interface Property {
    name: string;
    value: string;
}

export interface SemNotam {
    notam: Notam;
    results: Array<String>;
}

export interface Notam {
    name :String;
    properties: Map<String, String>;
}