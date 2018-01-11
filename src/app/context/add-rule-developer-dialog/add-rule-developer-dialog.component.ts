import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user/user';
import { UserService } from '../../user/index';

@Component({
    selector: 'add-rule-developer-dialog',
    templateUrl: './add-rule-developer-dialog.component.html',
    styleUrls: ['./add-rule-developer-dialog.component.scss']
})
export class AddRuleDeveloperDialogComponent implements OnInit {

    @Input() public contextId: number;
    @Input() public display: boolean;
    @Output() public displayChange = new EventEmitter();
    public ruleDevelopers: Array<User>;
    
    constructor(
        private userService: UserService
    ) { }

    public async ngOnInit() {
        this.ruleDevelopers = await this.userService.getNotAssignedRuleDevelopers(this.contextId);
    }

    public ngOnDestroy(): void {
        this.onClose();
    }

    public async save() {
        this.onClose();
    }

    public cancel(): void {
        this.onClose();
    }

    private onClose(): void {
        this.display = false;
        this.displayChange.emit(false);
    }

}
