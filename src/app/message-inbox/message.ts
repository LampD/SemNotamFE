import { User } from "../user/user";

export interface Message {
    id: number;
    time: Date;
    sender: User;
    title: string;
    element: string;
    status: string;
    type: string;
    content: string;
    recipients: Array<User>
}