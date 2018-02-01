import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContextService } from '../context.service';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

export interface DropDownItem {
    name: string;
}

@Component({
    selector: 'de-contextualize-dialog',
    templateUrl: './de-contextualize-dialog.component.html',
    styleUrls: ['./de-contextualize-dialog.component.scss']
})
export class DeContextualizeDialogComponent implements OnInit {

    @Input() public display: boolean;
    @Input() public isContextualize: boolean;
    @Input() public isDecontextualize: boolean;
    @Input() public isMerge: boolean;
    @Input() public contextId: String;
    @Output() public callback = new EventEmitter<string>();
    public contextStrings: Array<string>;
    public selectedContextString: DropDownItem;
    public dropDownItems: Array<DropDownItem> = [];

    constructor(
        private contextService: ContextService
    ) { }

    public async ngOnInit() {
        
    }

    public async ngOnChanges(changes: SimpleChanges) {
        if(changes.display) {
            if (this.isMerge || this.isDecontextualize) {
                this.contextStrings = await this.contextService.getParentContextNames(this.contextId);
            } else {
                this.contextStrings = await this.contextService.getChildContextNames(this.contextId);
            }
            this.dropDownItems = this.contextStrings.map(cs => <DropDownItem>{name:cs});
            this.selectedContextString = this.dropDownItems[0];
        }
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
        
        if(this.selectedContextString) {
            this.callback.emit(this.selectedContextString.name);
        } else {
            this.callback.emit(null);
        }
    }
}
