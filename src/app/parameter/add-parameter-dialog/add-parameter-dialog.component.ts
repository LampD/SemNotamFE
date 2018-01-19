import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Parameter, ParameterValue} from '../parameter';
import {ParameterService} from '../parameter.service';

@Component({
  selector: 'add-parameter-dialog',
  templateUrl: './add-parameter-dialog.component.html',
  styleUrls: ['./add-parameter-dialog.component.scss']
})
export class AddParameterDialogComponent implements OnInit {


  @Input() public display: boolean;
  @Output() public displayChange: EventEmitter<any> = new EventEmitter();

  public newParameter: Parameter;
  public parameterValue: string;
  public detParamValue: string;
  public parameterName: string;
  public detParamValues: Array<string> = [];
  public value: ParameterValue;
  @Output() public callback: EventEmitter<any> = new EventEmitter();

  constructor(
    private parameterService: ParameterService) { }

  ngOnInit() {
    this.value = {
      name: '',
      parents: [],
      children: []
    };

    this.newParameter = {
      parameterValueHierarchy: null,
      detParamValue: [],
      name: ''
    };
  }

  public ngOnDestroy(): void {
    this.onClose();
  }

  public async save() {
    try{
      this.detParamValues.push(this.detParamValue);
      this.value.name = this.parameterValue;
      this.newParameter.detParamValue = this.detParamValues;
      this.newParameter.parameterValueHierarchy = this.value;
      this.newParameter.name = this.parameterName;
      this.callback.emit(this.newParameter);
    }catch (e) {
        console.log(e.message);
    }finally {
      this.onClose();
      this.display = false;
    }
  }

  public cancel(): void {
    this.onClose();
  }

  private onClose(): void {
    this.displayChange.emit(false);
  }

}
