import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextDetailModel, RuleDeveloper, BusinessRule } from '../context';
import { ContextService } from '../context.service';

@Component({
    selector: 'context-detail',
    templateUrl: './context-detail.component.html',
    styleUrls: ['./context-detail.component.scss']
})
export class ContextDetailComponent implements OnInit {

    public contextDetailModel: ContextDetailModel;
    private contextId: String;
    public showUpdateContextDialog: boolean;
    public showAddRuleDeveloperDialog: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private contextService: ContextService
    ) { }

    public async ngOnInit() {
        this.activatedRoute
        .queryParams
        .subscribe(params => {
            this.contextId = params['id'];
        });

        this.contextDetailModel = await this.contextService.getContextDetailModel(this.contextId);
    }

    public addRuleDeveloper(): void {
        this.showAddRuleDeveloperDialog = true;
    }

    public async removeRuleDeveloper(ruleDeveloper: RuleDeveloper) {
    }

    public decontextualiseRule(rule: BusinessRule): void {

    }

    public contextualiseRule(rule: BusinessRule): void {

    }

    public editRule(rule: BusinessRule): void {

    }

    public addRule(rule: BusinessRule): void {

    }

    public async removeRule(rule: BusinessRule) {
        this.contextDetailModel = await this.contextService.removeRule(this.contextId, rule.id);
    }

    public mergeContext(): void {

    }

    public splitContext(): void {

    }

    public deleteContext(): void {

    }

    public updateParamValues(): void {
        this.showUpdateContextDialog = true;
    }
}
