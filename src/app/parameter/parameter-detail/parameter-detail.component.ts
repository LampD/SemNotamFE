import { Component, OnInit } from '@angular/core';
import {ParameterService} from '../parameter.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingIndicatorService} from '../../common';
import {Parameter} from '../parameter';
import {TreeNode} from 'primeng/primeng';

@Component({
  selector: 'app-parameter-detail',
  templateUrl: './parameter-detail.component.html',
  styleUrls: ['./parameter-detail.component.scss']
})
export class ParameterDetailComponent implements OnInit {

  public parameterValues: TreeNode[];
  public parameterId: number;
  public selectedParameter: Parameter;

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
    this.parameterValues = <TreeNode[]> this.selectedParameter.parameterValues;
    console.log(this.parameterValues);
  }

}
