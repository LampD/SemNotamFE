import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message-inbox/index';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/components/common/treenode';
import { ContextService } from './context.service';
import { Context } from './context';
import { Parameter } from '../parameter/parameter';
import { TransactionService } from '../transaction/transaction.service';
import { AllowedOpertions } from '../transaction/transaction';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit {

    public isLoading: boolean;
    public columns: Array<Parameter>;
    public contexts: Array<TreeNode>;
    public showCreateContextDialog: boolean;
    public allowedOperations: AllowedOpertions;

    constructor(
        private contextService: ContextService,
        private router: Router,
        private transactionService: TransactionService,
    ) { }

    public async ngOnInit() {
        var result = await Promise.all([
            this.contextService.getParameterNames(), 
            this.contextService.getContextHierachy(),
            this.transactionService.getAllowedOperations(),
        ]);
        this.columns = result[0];
        var rootContext = result[1];
        this.allowedOperations = result[2];

        // this.columns = await this.contextService.getParameterNames();
        // var rootContext = await this.contextService.getContextHierachy();
        this.contexts = [this.toTreeNode(rootContext)];
    }

    private toTreeNode(context :Context) :TreeNode {
        return {
            data: {
                name: context.name,
                ...context.parameterValues
            },
            children: context.children.map(c => this.toTreeNode(c)),
            expanded: true
        };  
    }

    public navigateToDetail(treeItem): void {
        this.router.navigate(['contextDetail'], { queryParams: { id: treeItem.data.name } });
    }

    public newContext(): void {
        this.router.navigate(['newMessage']);
    }

    public openContextDialog(): void {
        this.showCreateContextDialog = true;
    }

    public async addContextCallback(context :Context) {
        var rootContext = await this.contextService.addContext(context);
        this.contexts = [this.toTreeNode(rootContext)];
    }
}
