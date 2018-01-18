import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user/user';
import { UserService } from '../../user/index';
import { ContextDetailModel } from '../context';

@Component({
    selector: 'add-rule-developer-dialog',
    templateUrl: './add-rule-developer-dialog.component.html',
    styleUrls: ['./add-rule-developer-dialog.component.scss']
})
export class AddRuleDeveloperDialogComponent implements OnInit {

    @Input() public context: ContextDetailModel;
    @Input() public display: boolean;
    @Output() public displayChange: EventEmitter<any> = new EventEmitter();
    @Output() public callback: EventEmitter<any> = new EventEmitter();

    public ruleDevelopers: Array<User>;
    public ruleDeveloper: User;
    
    constructor(
        private userService: UserService
    ) { }

    public async ngOnInit() {
        var allRuleDevelopers = await this.userService.getAllRuleDevelopers();
        this.ruleDevelopers = allRuleDevelopers.filter(rd => !this.context.ruleDevelopers.find(crd=>crd.id === rd.id));
        this.ruleDeveloper = this.ruleDevelopers[0];
    }

    public ngOnDestroy(): void {
        this.onClose();
    }

    public async save() {
        this.callback.emit(this.ruleDeveloper);
        this.onClose();
    }

    public cancel(): void {
        this.onClose();
    }

    private onClose(): void {
        this.displayChange.emit(false);
    }

}
