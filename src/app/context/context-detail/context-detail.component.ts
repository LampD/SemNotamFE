import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextDetailModel, RuleDeveloper, BusinessItem } from '../context';
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

    public removeRuleDeveloper(ruleDeveloper: RuleDeveloper): void {

    }

    public decontextualiseRule(rule: BusinessItem): void {

    }

    public contextualiseRule(rule: BusinessItem): void {

    }

    public editRule(rule: BusinessItem): void {

    }

    public addRule(rule: BusinessItem): void {

    }

    public removeRule(rule: BusinessItem): void {

    }

    public decontextualiseTerm(term: BusinessItem): void {

    }

    public contextualiseTerm(term: BusinessItem): void {

    }

    public editTerm(term: BusinessItem): void {

    }

    public addTerm(term: BusinessItem): void {

    }

    public removeTerm(term: BusinessItem): void {

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
