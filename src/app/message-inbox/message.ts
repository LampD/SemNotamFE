import { User } from "../user/user";

export interface Message {
    id: number;
    time: Date;
    sender: User;
    title: string;
    affectedElement: string;
    affectedElementType: string;
    read: boolean;
    acknowledged: boolean;
    type: string;
    content: string;
    recipients: Array<User>
}