import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/index';
import { User } from '../../user/user';

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

    constructor(
        private userService: UserService
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
        } catch(e) {
            // TODO notification
        } finally {
            this.isLoading = false;
        }
    }
}
