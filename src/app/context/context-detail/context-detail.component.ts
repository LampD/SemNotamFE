import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextDetailModel, BusinessRule, Context } from '../context';
import { ContextService } from '../context.service';
import { User } from '../../user/index';
import { Router } from '@angular/router';
import { TransactionService } from '../../transaction/transaction.service';
import { AllowedOpertions } from '../../transaction/transaction';

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
    public showAddUpdateRuleDialog: boolean;
    public showDeContextualizeDialog: boolean;
    public rule: BusinessRule;
    public isContextualize: boolean;
    public allowedOperations: AllowedOpertions;

    constructor(
        private activatedRoute: ActivatedRoute,
        private contextService: ContextService,
        private router: Router,
        private transactionService: TransactionService,
    ) { }

    public async ngOnInit() {
        this.activatedRoute
        .queryParams
        .subscribe(params => {
            this.contextId = params['id'];
        });

        this.contextDetailModel = await this.contextService.getContextDetailModel(this.contextId);
        this.allowedOperations = await this.transactionService.getAllowedOperations();
    }

    public addRuleDeveloper(): void {
        this.rule = <BusinessRule>{};
        this.showAddRuleDeveloperDialog = true;
    }

    public async removeRuleDeveloper(ruleDeveloper: User) {
        if (this.contextDetailModel.ruleDevelopers.length > 1) {
            this.contextDetailModel = await this.contextService.removeRuleDeveloper(this.contextId, ruleDeveloper.id);
        }
    }

    public decontextualiseRule(rule: BusinessRule): void {
        this.isContextualize = false;
        this.showDeContextualizeDialog = true;
    }

    public contextualiseRule(rule: BusinessRule): void {
        this.isContextualize = true;
        this.showDeContextualizeDialog = true;
    }

    public deContextualizeCallback(contextString: string) {
        this.showDeContextualizeDialog = false;
    }

    public editRule(rule: BusinessRule): void {
        this.rule = rule;
        this.showAddUpdateRuleDialog = true;
    }

    public addRule(rule: BusinessRule): void {
        this.rule = <BusinessRule>{};
        this.showAddUpdateRuleDialog = true;
    }

    public async removeRule(rule: BusinessRule) {
        this.contextDetailModel = await this.contextService.removeRule(this.contextId, rule.id);
    }

    public mergeContext(): void {

    }

    public splitContext(): void {

    }

    public async deleteContext() {
        await this.contextService.deleteContext(this.contextId);
        this.router.navigate(['contexts']);
    }

    public updateParamValues(): void {
        this.showUpdateContextDialog = true;
    }

    public async addRuleDeveloperCallback(ruleDeveloper :User) {
        this.contextDetailModel = await this.contextService.addRuleDeveloper(this.contextId, ruleDeveloper);
    }

    public async addUpdateRuleCallback(rule :BusinessRule) {
        this.contextDetailModel = await this.contextService.addUpdateRule(this.contextId, rule);
    }

    public async updateParamValuesCallback(context :Context) {
        //this.contextDetailModel = await this.contextService.updateParamValues(context);
    }


}
