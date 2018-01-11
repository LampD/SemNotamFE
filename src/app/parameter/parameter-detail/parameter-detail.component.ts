import { Component, OnInit } from '@angular/core';
import {ParameterService} from '../parameter.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingIndicatorService} from '../../common';
import {Parameter, ParameterValue} from '../parameter';
import {TreeNode} from 'primeng/primeng';

@Component({
    selector: 'parameter-detail',
    templateUrl: './parameter-detail.component.html',
    styleUrls: ['./parameter-detail.component.scss']
})
export class ParameterDetailComponent implements OnInit {

  public parameterValues: TreeNode[];
  public parameterId: number;
  public selectedParameter: Parameter;
  public detParamValue: String;

  constructor(
    private loadingIndicatorService: LoadingIndicatorService,
    private activatedRoute: ActivatedRoute,
    private parameterService: ParameterService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.parameterId = params['id'];
      });
    this.selectedParameter = await this.parameterService.loadParameter(this.parameterId);
    this.parameterValues = [this.toTreeNode(this.selectedParameter.parameterValueHierarchy)];
    this.detParamValue = this.selectedParameter.detParamValue.join('\n');
    console.log(this.parameterValues);
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

}
