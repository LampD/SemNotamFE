import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/index';
import { User } from '../../user/user';
import { MessageService } from '../message.service';
import { AuthService } from '../../auth/auth.service';
import { Message } from '../message';

export interface DropDownItem {
    label: string;
    value: any;
}

@Component({
    selector: 'new-message',
    templateUrl: './new-message.component.html',
    styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {

    public isLoading: boolean;
    public users: Array<User> = [];
    public dropDownRecipient: Array<DropDownItem> = [];
    public selectedRecipient: User;
    public message: Message;

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private authService: AuthService,
    ) { }

    public async ngOnInit() {
        this.isLoading = true;
        try {
            this.users = await this.userService.getUsers();

            this.users.forEach(u => {
                let dropDownItem: DropDownItem = {
                    label: u.name,
                    value: u
                }
    
                this.dropDownRecipient.push(dropDownItem);
            });
            this.message = <Message>{};
            this.selectedRecipient = this.users[0];
        } catch(e) {
            // TODO notification
        } finally {
            this.isLoading = false;
        }
    }

    public async newMessage() {
        this.message.recipients = [this.selectedRecipient];
        this.message.sender = this.authService.currentUser;
        debugger;
        await this.messageService.sendMessage(this.message);
    }
}
