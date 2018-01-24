import { User } from "../user/user";

export interface ComposedOperation extends Operation {
  operations: Array<Operation>;
}

export interface Operation {
  id: number;
  executedAt: Date;
  executed: boolean;
  text: string;
  executedBy: User;
  userId: number;
  affectedElement: string;
  parentId: number;
  verb: string;
  affectedElementType: string;
}

export interface AllowedOpertions {
  EditRule: boolean,
  AddParameterValue: boolean,
  AddContext: boolean,
  SplitContext: boolean,
  DeleteRule: boolean,
  Step: boolean,
  MergeContext: boolean,
  AddRule: boolean
}
