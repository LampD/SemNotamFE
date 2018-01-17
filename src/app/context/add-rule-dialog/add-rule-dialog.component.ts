import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusinessRule } from '../context';

@Component({
    selector: 'add-rule-dialog',
    templateUrl: './add-rule-dialog.component.html',
    styleUrls: ['./add-rule-dialog.component.scss']
})
export class AddRuleDialogComponent implements OnInit {

    @Input() public contextId: number;
    @Input() public display: boolean;
    @Output() public displayChange: EventEmitter<any> = new EventEmitter();
    @Output() public callback: EventEmitter<any> = new EventEmitter();

    public rule: BusinessRule;
    
    constructor(
    ) { }

    public async ngOnInit() {
        this.rule = {};
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
