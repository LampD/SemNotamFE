import { Component, OnInit } from '@angular/core';
import {ParameterService} from '../parameter.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingIndicatorService} from '../../common';
import {Parameter, ParameterValue} from '../parameter';
import {TreeNode} from 'primeng/primeng';
import { TransactionService } from '../../transaction/transaction.service';
import { AllowedOpertions } from '../../transaction/transaction';

@Component({
    selector: 'parameter-detail',
    templateUrl: './parameter-detail.component.html',
    styleUrls: ['./parameter-detail.component.scss']
})
export class ParameterDetailComponent implements OnInit {

  public parameterValues: TreeNode[];
  public parameterId: number;
  public parameter: Parameter;
  public detParamValue: String;
  public showAddParameterValueDialog: boolean;
  public allowedOperations: AllowedOpertions;

  private selectedParameterValue: String;

  constructor(
    private loadingIndicatorService: LoadingIndicatorService,
    private activatedRoute: ActivatedRoute,
    private parameterService: ParameterService,
    private router: Router,
    private transactionService: TransactionService,
  ) { }

  async ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.parameterId = params['id'];
      });
    this.parameter = await this.parameterService.loadParameter(this.parameterId);
    this.parameterValues = [this.toTreeNode(this.parameter.parameterValueHierarchy)];
    this.detParamValue = this.parameter.detParamValue.join('\n');
    this.allowedOperations = await this.transactionService.getAllowedOperations();
  }

  private toTreeNode(parameterValue :ParameterValue) :TreeNode {
    return {
        data: {
            name: parameterValue.name,
        },
        children: parameterValue.children.map(c => this.toTreeNode(c)),
        expanded: true
    };
  }

  public async deleteParameterValue(treeNode :TreeNode) {
    if (treeNode !== this.parameterValues[0]) {
      this.loadingIndicatorService.displayLoader(true);
      this.parameter = await this.parameterService.deleteParameterValue(this.parameterId, treeNode.data.name);
      this.parameterValues = [this.toTreeNode(this.parameter.parameterValueHierarchy)];
      this.loadingIndicatorService.displayLoader(false);
    }
  }

  public async addParameterValue(treeNode :TreeNode) {
    this.showAddParameterValueDialog = true;
    this.selectedParameterValue = treeNode.data.name;
  }

  public async addParameterValueCallback(parameterValue :ParameterValue) {
    parameterValue.parents = [<ParameterValue>{name:this.selectedParameterValue}];
    this.parameter = await this.parameterService.addParameterValue(this.parameterId, parameterValue);
    this.parameterValues = [this.toTreeNode(this.parameter.parameterValueHierarchy)];
  }

  public async updateDetParamValue() {
    this.parameter.detParamValue = this.detParamValue.split('\n');
    this.parameter = await this.parameterService.updateDetParamValue(this.parameterId, this.parameter);
    this.parameterValues = [this.toTreeNode(this.parameter.parameterValueHierarchy)];
  }

}
