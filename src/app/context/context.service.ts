import { Injectable } from '@angular/core';
import { HttpService, SettingsService } from '../common/index';
import { TreeNode } from 'primeng/components/common/treenode';
import { ParameterType, ContextDetailModel, ParameterTypeValues, Context } from './context';
import { Parameter } from '../parameter/parameter';

@Injectable()
export class ContextService {

    constructor(
        private httpService: HttpService,
        private settingsService: SettingsService
    ) { }

    public getContextHierachy(): Promise<Context> {
        return this.httpService.get<Context>(this.settingsService.serverPath + 'contexts');
    }

    public getParameterNames(): Promise<Array<Parameter>> {
        return this.httpService.get<Array<Parameter>>(this.settingsService.serverPath + 'parameters');
    }

    public getContextDetailModel(contextId: String): Promise<ContextDetailModel> {
        return this.httpService.get<ContextDetailModel>(this.settingsService.serverPath + 'contexts/' + contextId);
    }

    public getParameterTypeValues(): Promise<Array<ParameterTypeValues>> {
        return this.httpService.get<Array<ParameterTypeValues>>(this.settingsService.serverPath + 'parameterTypeValues');
    }
}
