import { Component, OnInit } from '@angular/core';
import { ComposedOperation, Operation, AllowedOpertions, SendMessage } from './transaction';
import { Router } from '@angular/router';
import { TransactionService } from './transaction.service';
import { TreeNode } from 'primeng/primeng';
import { LoadingIndicatorService } from '../common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  public composedOperationRoot: ComposedOperation;
  public composedOperationHierarchy: [TreeNode];
  public allowedOperations: AllowedOpertions;

  constructor( 
    private loadingIndicatorService: LoadingIndicatorService,
    private router: Router,
    private transactionService: TransactionService,
  ) {}

  public async ngOnInit() {
    this.allowedOperations = await this.transactionService.getAllowedOperations();
    this.composedOperationRoot = await this.transactionService.getComposedOperationHierarchy();
    this.composedOperationHierarchy = this.composedOperationRoot.id && [this.toTreeNode(this.composedOperationRoot)];
  }

  private toTreeNode(o :Operation) :TreeNode {
    var co = <ComposedOperation> o;
    var label = `${new Date(o.executedAt).toLocaleString()} ${o.executedBy.name} --> ${o.verb} - ${o.affectedElementType} ${o.affectedElement}`;
    if (o.concreteType === "SendMessage") {
      label += ` to ${ (<SendMessage>o).message.recipients.map(r => r.name).join(', ')}`;
    }
    return {
        data: {label, data:o},
        children: co.operations && co.operations.map(c => this.toTreeNode(c)),
        expanded: true
    };
  }

  public async rollbackTransaction() {
    this.loadingIndicatorService.displayLoader(true);
    this.composedOperationRoot = await this.transactionService.rollbackTransaction();
    this.composedOperationHierarchy = this.composedOperationRoot.id && [this.toTreeNode(this.composedOperationRoot)];
    this.allowedOperations = await this.transactionService.getAllowedOperations();
    this.loadingIndicatorService.displayLoader(false);

  }

  public async commitTransaction() {
    this.loadingIndicatorService.displayLoader(true);
    this.composedOperationRoot = await this.transactionService.commitTransaction();
    this.composedOperationHierarchy = this.composedOperationRoot.id && [this.toTreeNode(this.composedOperationRoot)];
    this.allowedOperations = await this.transactionService.getAllowedOperations();
    this.loadingIndicatorService.displayLoader(false);
  }
}
