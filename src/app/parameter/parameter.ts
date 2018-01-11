import {TreeNode} from 'primeng/primeng';


export interface ParameterValue {
  name: string;
  children: Array<ParameterValue>;
}

export interface Parameter {
  name: string;
  detParamValue: string;
  parameterValueHierarchy: ParameterValue;
}





