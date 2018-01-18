import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParameterValue, Parameter } from '../parameter';

@Component({
    selector: 'add-parameter-value-dialog',
    templateUrl: './add-parameter-value-dialog.component.html',
    styleUrls: ['./add-parameter-value-dialog.component.scss']
})
export class AddParameterValueDialogComponent implements OnInit {

    @Input() public contextId: number;
    @Input() public display: boolean;
    @Output() public displayChange: EventEmitter<any> = new EventEmitter();
    public parameterValue: ParameterValue;
    @Output() public callback: EventEmitter<any> = new EventEmitter();
    
    constructor(
    ) { }

    public async ngOnInit() {
        this.parameterValue = <ParameterValue>{};
    }

    public ngOnDestroy(): void {
        this.onClose();
    }

    public async save() {
        this.callback.emit(this.parameterValue);
        this.onClose();
    }

    public cancel(): void {
        this.onClose();
    }

    private onClose(): void {
        this.displayChange.emit(false);
    }

}
