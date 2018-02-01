import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Parameter, ParameterValue} from './parameter';
import {Router} from '@angular/router';
import {LoadingIndicatorService} from '../common';
import {ParameterService} from './parameter.service';
import {NotificationService} from '../common/notificationService';
import { AllowedOpertions } from '../transaction/transaction';
import { TransactionService } from '../transaction/transaction.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  public parameters: Array<Parameter> = [];
  public displayAddParameter: boolean;
  public parameter: Parameter;
  public loading: boolean;
  public allowedOperations: AllowedOpertions;

  constructor(
    private loadingIndicatorService: LoadingIndicatorService,
    private parameterService: ParameterService,
    private router: Router,
    private notificationService: NotificationService,
    private transactionService: TransactionService,
  ) { }

  public async ngOnInit() {
      this.loading  = true;
      this.parameters = await this.parameterService.getParameter();
      this.loading = false;
      this.allowedOperations = await this.transactionService.getAllowedOperations();
  }

  public showDetails(parameter: Parameter){
    this.router.navigate(['parameterDetails'], { queryParams: { id: parameter.name } } );
  }

  public newParameter(){
    this.displayAddParameter = true;
  }

  public async addParameterCallback(parameter: Parameter) {
    try{
      this.loading = true;
      this.parameter = await this.parameterService.addParameter(parameter);
      this.parameters.push(this.parameter);
      this.notificationService.success('Add Parameter', 'Success');
    } catch (e) {
      console.log(e.message);
      this.notificationService.error('Add Parameter', 'Error');
    }finally {
      this.loading = false;
      this.ngOnInit();
    }
  }

  public async deleteParameter(parameter: Parameter) {
    try {
      this.loading = true;
      const success = await this.parameterService.deleteParameter(parameter);
      if (success) {
        this.notificationService.success('Delete Parameter', 'Success');
      }else{
        this.notificationService.error('Delete Parameter', 'Can`t be deleted directly. <br/>Composed Operation started.<br/>Check your inbox!');
      }
    } catch (e) {
        this.notificationService.error('Delete Parameter', 'Error <br/>'+e.message);
    } finally {
      this.loading = false;
      this.ngOnInit();
    }
  }


}
