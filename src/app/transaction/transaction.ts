import { User } from "../user/user";
import { Message } from "../message-inbox/message";

export interface ComposedOperation extends Operation {
  operations: Array<Operation>;
}

export interface SendMessage extends Operation {
  message: Message;
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
  concreteType: string;
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
