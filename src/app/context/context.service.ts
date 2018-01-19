import { Injectable } from '@angular/core';
import { HttpService, SettingsService } from '../common/index';
import { TreeNode } from 'primeng/components/common/treenode';
import { ContextDetailModel, Context, BusinessRule } from './context';
import { Parameter, ParameterWithValues } from '../parameter/parameter';
import { User } from '../user/index';

@Injectable()
export class ContextService {

    constructor(
        private httpService: HttpService,
        private settingsService: SettingsService
    ) { }

    public getContextHierachy(): Promise<Context> {
        return this.httpService.get<Context>(this.settingsService.serverPath + 'contexts');
    }

    public getContextNames(): Promise<Array<string>> {
        return this.httpService.get<Array<string>>(this.settingsService.serverPath + 'contexts/strings');
    }

    public getParameterNames(): Promise<Array<Parameter>> {
        return this.httpService.get<Array<Parameter>>(this.settingsService.serverPath + 'parameters');
    }

    public getContextDetailModel(contextId: String): Promise<ContextDetailModel> {
        return this.httpService.get<ContextDetailModel>(this.settingsService.serverPath + 'contexts/' + contextId);
    }

    public getParameterWithValues(): Promise<Array<ParameterWithValues>> {
        return this.httpService.get<Array<ParameterWithValues>>(this.settingsService.serverPath + 'parameters/withValues');
    }

    public removeRule(contextId :String, ruleId :String): Promise<ContextDetailModel> {
        return this.httpService.delete<ContextDetailModel>(this.settingsService.serverPath + 'contexts/' + contextId + '/rule/' + ruleId);
    }

    public removeRuleDeveloper(contextId :String, userId :number): Promise<ContextDetailModel> {
        return this.httpService.delete<ContextDetailModel>(this.settingsService.serverPath + 'contexts/' + contextId + '/ruleDeveloper/' + userId);
    }
    
    public addRuleDeveloper(contextId :String, user :User): Promise<ContextDetailModel> {
        return this.httpService.post<ContextDetailModel>(this.settingsService.serverPath + 'contexts/' + contextId + '/ruleDeveloper', user);
    }

    public addUpdateRule(contextId :String, rule :BusinessRule): Promise<ContextDetailModel> {
        return this.httpService.put<ContextDetailModel>(this.settingsService.serverPath + 'contexts/' + contextId + '/rule/'+rule.id, rule);
    }

    public addContext(context :Context): Promise<Context> {
        return this.httpService.post<Context>(this.settingsService.serverPath + 'contexts', context);
    }

    public deleteContext(contextId :String): Promise<void> {
        return this.httpService.delete<void>(this.settingsService.serverPath + 'contexts/' + contextId);
    }
}
