import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContextService } from '../context.service';

export interface DropDownItem {
    label: string;
}

@Component({
    selector: 'de-contextualize-dialog',
    templateUrl: './de-contextualize-dialog.component.html',
    styleUrls: ['./de-contextualize-dialog.component.scss']
})
export class DeContextualizeDialogComponent implements OnInit {

    @Input() public display: boolean;
    @Input() public isContextualize: boolean;
    @Output() public callback = new EventEmitter<string>();
    public contextStrings: Array<string>;
    public selectedContextString: string;
    public dropDownItems: Array<DropDownItem> = [];

    constructor(
        private contextService: ContextService
    ) { }

    public async ngOnInit() {
        this.contextStrings = await this.contextService.getContextNames();

        this.contextStrings.forEach(cs => {
            this.dropDownItems.push({
                label: cs
            });
        });
    }

    public ngOnDestroy(): void {
        this.onClose();
    }

    public async save() {
        this.onClose(this.selectedContextString);
    }

    public cancel(): void {
        this.onClose();
    }

    private onClose(contextString?: string): void {
        this.display = false;
        
        if(contextString) {
            this.callback.emit(this.selectedContextString);
        } else {
            this.callback.emit(null);
        }
    }
}
