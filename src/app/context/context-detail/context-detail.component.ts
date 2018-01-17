import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextDetailModel, BusinessRule } from '../context';
import { ContextService } from '../context.service';
import { User } from '../../user/index';

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
    public showAddRuleDialog: boolean;

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

    public async removeRuleDeveloper(ruleDeveloper: User) {
        this.contextDetailModel = await this.contextService.removeRuleDeveloper(this.contextId, ruleDeveloper.id);
    }

    public decontextualiseRule(rule: BusinessRule): void {

    }

    public contextualiseRule(rule: BusinessRule): void {

    }

    public editRule(rule: BusinessRule): void {

    }

    public addRule(rule: BusinessRule): void {
        this.showAddRuleDialog = true;
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

    public async addRuleDeveloperCallback(ruleDeveloper :User) {
        this.contextDetailModel = await this.contextService.addRuleDeveloper(this.contextId, ruleDeveloper);
    }

    public async addRuleCallback(rule :BusinessRule) {
        this.contextDetailModel = await this.contextService.addRule(this.contextId, rule);
    }
}
