import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
import { SettingsService } from '../common/settings.service';
import {Parameter, ParameterValue} from './parameter';
import {Message} from '../message-inbox/message';

@Injectable()
export class ParameterService {

  constructor(
    private http: HttpService,
    private settingsService: SettingsService
  ) { }

  public getParameter(): Promise<Array<Parameter>> {
    return this.http.get<Array<Parameter>>(this.settingsService.serverPath + 'parameters');
  }

  public loadParameter(id: number): Promise<Parameter> {
    return this.http.get<Parameter>(this.settingsService.serverPath + 'parameters/' + id);
  }

  public deleteParameterValue(id: number, parameterValue: String): Promise<Parameter> {
    return this.http.delete<Parameter>(this.settingsService.serverPath + 'parameters/' + id + '/' + parameterValue);
  }

  public addParameterValue(id: number, parameterValue: ParameterValue): Promise<Parameter> {
    return this.http.post<Parameter>(this.settingsService.serverPath + 'parameters/' + id, parameterValue);
  }

  public updateDetParamValue(id: number, parameter: Parameter): Promise<Parameter> {
    return this.http.put<Parameter>(this.settingsService.serverPath + 'parameters/' + id, parameter);
  }

}
