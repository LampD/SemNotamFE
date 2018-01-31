import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusinessRule } from '../context';

@Component({
    selector: 'add-update-rule-dialog',
    templateUrl: './add-update-rule-dialog.component.html',
    styleUrls: ['./add-update-rule-dialog.component.scss']
})
export class AddUpdateRuleDialogComponent implements OnInit {

    @Input() public contextId: number;
    @Input() public display: boolean;
    @Input() public isAdd: boolean;
    @Output() public displayChange: EventEmitter<any> = new EventEmitter();
    @Input() public rule: BusinessRule;
    @Output() public callback: EventEmitter<any> = new EventEmitter();
    
    constructor(
    ) { }

    public async ngOnInit() {
        if (this.rule === undefined) {
            this.rule = <BusinessRule>{};
        }
    }

    public ngOnDestroy(): void {
        this.onClose();
    }

    public async save() {
        this.callback.emit(this.rule);
        this.onClose();
    }

    public cancel(): void {
        this.onClose();
    }

    private onClose(): void {
        this.displayChange.emit(false);
    }

}
