import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ParameterTypeValues } from '../context';
import { ContextService } from '../context.service';

@Component({
    selector: 'add-update-context-dialog',
    templateUrl: './add-update-context-dialog.component.html',
    styleUrls: ['./add-update-context-dialog.component.scss']
})
export class AddUpdateContextDialogComponent implements OnInit, OnDestroy {

    @Input() public contextId?: number;
    @Input() public display: boolean;
    @Output() public displayChange = new EventEmitter();
    public parameterTypeValues: Array<ParameterTypeValues>;
    
    constructor(
        private contextService: ContextService
    ) { }

    public async ngOnInit() {
        this.parameterTypeValues = await this.contextService.getParameterTypeValues();
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
