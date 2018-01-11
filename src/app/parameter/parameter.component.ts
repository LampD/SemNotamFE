import { Component, OnInit } from '@angular/core';
import {Parameter} from './parameter';
import {Router} from '@angular/router';
import {LoadingIndicatorService} from '../common';
import {ParameterService} from './parameter.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  public parameters: Array<Parameter> = [];

  constructor(
    private loadingIndicatorService: LoadingIndicatorService,
    private parameterService: ParameterService,
    private router: Router
  ) { }

  public async ngOnInit() {
      this.parameters = await this.parameterService.getParameter();
      console.log(this.parameters);
  }

  public showDetails(parameter: Parameter){
    this.router.navigate(['parameterDetails'], { queryParams: { id: parameter.name } } );
  }

}
