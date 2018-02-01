import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextDetailModel, BusinessRule, Context } from '../context';
import { ContextService } from '../context.service';
import { User } from '../../user/index';
import { Router } from '@angular/router';
import { TransactionService } from '../../transaction/transaction.service';
import { AllowedOpertions } from '../../transaction/transaction';
import { NotificationService } from '../../common/index';

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
    public isDecontextualize: boolean;
    public isMerge: boolean;
    public allowedOperations: AllowedOpertions;
    public isRuleAdd: boolean;
    public loading: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private contextService: ContextService,
        private router: Router,
        private transactionService: TransactionService,
        private notificationService: NotificationService,
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
        this.rule = rule;
        this.isMerge = false;
        this.isContextualize = false;
        this.isDecontextualize = true;
        this.showDeContextualizeDialog = true;
    }

    public contextualiseRule(rule: BusinessRule): void {
        this.rule = rule;
        this.isMerge = false;
        this.isContextualize = true;
        this.isDecontextualize = false;
        this.showDeContextualizeDialog = true;
    }

    public async deContextualizeCallback(contextString: string) {
        this.showDeContextualizeDialog = false;
        if (contextString) {
            if (this.isContextualize) {
                await this.contextService.contextualizeRule(this.contextId, this.rule, contextString);
            } else if (this.isDecontextualize) {
                await this.contextService.decontextualizeRule(this.contextId, this.rule, contextString);
            } else if (this.isMerge) {
                await this.contextService.mergeContext(this.contextId, contextString);
            }
        }
        this.rule = <BusinessRule>{};
        this.router.navigate(['contexts']);
    }

    public editRule(rule: BusinessRule): void {
        this.rule = rule;
        this.isRuleAdd = false;
        this.showAddUpdateRuleDialog = true;
    }

    public addRule(rule: BusinessRule): void {
        this.rule = <BusinessRule>{};
        this.isRuleAdd = true;
        this.showAddUpdateRuleDialog = true;
    }

    public async removeRule(rule: BusinessRule) {
        this.contextDetailModel = await this.contextService.removeRule(this.contextId, rule.id);
    }

    public mergeContext(): void {
        this.isMerge = true;
        this.isContextualize = false;
        this.isDecontextualize = false;
        this.showDeContextualizeDialog = true;
    }

    public async splitContext() {
        await this.contextService.splitContext(this.contextId);
        this.router.navigate(['contexts']);
    }

    public async deleteContext() {
        try {
            this.loading = true;
            var result = await this.contextService.deleteContext(this.contextId);
            if (result) {
                this.notificationService.success('Delete Context', 'Success');
            } else {
                this.notificationService.warning('Delete Context', 'Can`t be deleted directly. <br/>Composed Operation started.');
            }
            
        } catch (e) {
            console.log(e.message);
            this.notificationService.error('Delete Context', 'Error <br/>' + e.message);
        } finally {
            this.loading = false;
            this.router.navigate(['contexts']);
        }
    }

    public updateParamValues(): void {
        this.showUpdateContextDialog = true;
    }

    public async addRuleDeveloperCallback(ruleDeveloper :User) {
        this.contextDetailModel = await this.contextService.addRuleDeveloper(this.contextId, ruleDeveloper);
    }

    public async addUpdateRuleCallback(rule :BusinessRule) {
        if (this.isRuleAdd) {
            this.contextDetailModel = await this.contextService.addRule(this.contextId, rule);
        } else {
            this.contextDetailModel = await this.contextService.updateRule(this.contextId, rule);
        }
    }

    public async updateParamValuesCallback(context :Context) {
        //this.contextDetailModel = await this.contextService.updateParamValues(context);
    }

}
