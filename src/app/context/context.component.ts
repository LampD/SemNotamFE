import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message-inbox/index';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/components/common/treenode';
import { ContextService } from './context.service';
import { Context } from './context';
import { Parameter } from '../parameter/parameter';
import { TransactionService } from '../transaction/transaction.service';
import { AllowedOpertions } from '../transaction/transaction';
import { LoadingIndicatorService } from '../common/index';
import {NotificationService} from '../common/notificationService';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit {

    public columns: Array<String>;
    public contexts: Array<TreeNode>;
    public showCreateContextDialog: boolean;
    public allowedOperations: AllowedOpertions;
    public loading: boolean;

    constructor(
        private notificationService: NotificationService,
        private loadingIndicatorService: LoadingIndicatorService,
        private contextService: ContextService,
        private router: Router,
        private transactionService: TransactionService,
    ) { }

    public async ngOnInit() {
        this.loading  = true;
        var result = await Promise.all([
            this.contextService.getContextHierachy(),
            this.transactionService.getAllowedOperations(),
        ]);
        this.columns = Object.keys(result[0].parameterValues);
        var rootContext = result[0];
        this.allowedOperations = result[1];

        // this.columns = await this.contextService.getParameterNames();
        // var rootContext = await this.contextService.getContextHierachy();
        this.contexts = [this.toTreeNode(rootContext)];
        this.loading  = false;
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
        try {
            this.loading = true;
            await this.contextService.addContext(context);
            this.notificationService.success('Add Context', 'Success');
        } catch (e) {
            console.log(e.message);
            this.notificationService.error('Add Context', 'Error <br/>' + e.message);
        } finally {
            this.loading = false;
            this.ngOnInit();
        }
    }
}
