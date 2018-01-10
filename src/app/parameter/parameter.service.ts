import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
import { SettingsService } from '../common/settings.service';
import {Parameter} from './parameter';

@Injectable()
export class ParameterService {

  constructor(
    private http: HttpService,
    private settingsService: SettingsService
  ) { }

  public getParameter(): Promise<Array<Parameter>> {
    return this.http.get<Array<Parameter>>(this.settingsService.serverPath + 'parameter');
  }
}
