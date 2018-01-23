import { Component, OnInit } from '@angular/core';
import { ComposedOperation, Operation, AllowedOpertions } from './transaction';
import { Router } from '@angular/router';
import { TransactionService } from './transaction.service';
import { TreeNode } from 'primeng/primeng';

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
    return {
        data: {label:`${new Date(o.executedAt).toLocaleString()} ${o.executedBy.name} --> ${o.verb} - ${o.affectedElementType} ${o.affectedElement} `},
        children: co.operations && co.operations.map(c => this.toTreeNode(c)),
        expanded: true
    };  
  }

  public async rollbackTransaction() {
    this.composedOperationRoot = await this.transactionService.rollbackTransaction();
    this.composedOperationHierarchy = this.composedOperationRoot.id && [this.toTreeNode(this.composedOperationRoot)];
    this.allowedOperations = await this.transactionService.getAllowedOperations();

  }

  public async commitTransaction() {
    this.composedOperationRoot = await this.transactionService.commitTransaction();
    this.composedOperationHierarchy = this.composedOperationRoot.id && [this.toTreeNode(this.composedOperationRoot)];
    this.allowedOperations = await this.transactionService.getAllowedOperations();
  }
}
