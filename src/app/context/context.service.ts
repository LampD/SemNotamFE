import { Injectable } from '@angular/core';
import { HttpService, SettingsService } from '../common/index';
import { TreeNode } from 'primeng/components/common/treenode';
import { ParameterType, ContextDetailModel } from './context';

@Injectable()
export class ContextService {

    constructor(
        private httpService: HttpService,
        private settingsService: SettingsService
    ) { }

    public getContextHierachy(): Promise<Array<TreeNode>> {
        return this.httpService.get<Array<TreeNode>>(this.settingsService.serverPath + 'contextHierarchy');
    }

    public getParameterNames(): Promise<Array<ParameterType>> {
        return this.httpService.get<Array<ParameterType>>(this.settingsService.serverPath + 'parameterType');
    }

    public getContextDetailModel(contextId: number): Promise<ContextDetailModel> {
        return this.httpService.get<ContextDetailModel>(this.settingsService.serverPath + 'context/' + 1);
    }
}
