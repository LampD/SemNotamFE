import {TreeNode} from 'primeng/primeng';


export interface ParameterValue {
  parents: Array<ParameterValue>;
  name: string;
  children: Array<ParameterValue>;
}

export interface Parameter {
  name: string;
  detParamValue: Array<string>;
  parameterValueHierarchy: ParameterValue;
}

export interface ParameterWithValues {
  name: string;
  parameterValues: Array<ParameterValue>;
}

