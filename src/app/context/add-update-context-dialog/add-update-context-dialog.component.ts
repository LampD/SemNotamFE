import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OnDestroy, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ParameterWithValues, ParameterValue, Parameter } from '../../parameter/parameter';
import { ContextService } from '../context.service';
import { Context, ContextDetailModel } from '../context';
import { User } from '../../user/user';
import { UserService } from '../../user/index';

@Component({
    selector: 'add-update-context-dialog',
    templateUrl: './add-update-context-dialog.component.html',
    styleUrls: ['./add-update-context-dialog.component.scss']
})
export class AddUpdateContextDialogComponent implements OnInit, OnDestroy, OnChanges {

    @Input() public context?: ContextDetailModel;
    @Input() public display: boolean;
    @Output() public displayChange = new EventEmitter();
    @Output() public callback = new EventEmitter();
    public parameterWithValues: Array<ParameterWithValues>;
    public selectedParameterValues: Map<String,ParameterValue>;
    public ruleDeveloper: User;
    public ruleDevelopers: Array<User>;
    public isAdd: boolean;

    
    constructor(
        private contextService: ContextService,
        private userService: UserService
    ) { }

    public async ngOnInit() {
        this.parameterWithValues = await this.contextService.getParameterWithValues();
        if (!this.context) {
            this.isAdd = true;
            this.context = <ContextDetailModel>{};
            this.selectedParameterValues = <Map<String,ParameterValue>>{};
            this.parameterWithValues.forEach(p => {
                this.selectedParameterValues[p.name] = p.parameterValues[0];
            });
            this.ruleDevelopers = await this.userService.getAllRuleDevelopers();
            this.ruleDeveloper = this.ruleDevelopers[0];
        }
    }

    public async ngOnChanges(changes: SimpleChanges) {
        if(changes.context && changes.context.currentValue !== changes.context.previousValue) {
            this.isAdd = false;
            this.selectedParameterValues = <Map<String,ParameterValue>>{};
            for (var key in this.context.parameterValues) {
                if (!this.context.parameterValues.hasOwnProperty(key)) continue;
                var obj = <string> this.context.parameterValues[key];
                this.selectedParameterValues[key] = <ParameterValue>{name:obj};
            }
        }
    }

    public ngOnDestroy(): void {
        this.onClose();
    }

    public async save() {
        this.context.parameterValues = <Map<String,String>>{};
        for (var key in this.selectedParameterValues) {
            if (!this.selectedParameterValues.hasOwnProperty(key)) continue;
            var obj = <ParameterValue> this.selectedParameterValues[key];
            this.context.parameterValues[key] = obj.name;
        }
        if(this.isAdd) {
            this.context.ruleDevelopers = [this.ruleDeveloper];
            this.context.name = Object.values(this.context.parameterValues).join('_');
        }
        this.callback.emit(this.context);
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
