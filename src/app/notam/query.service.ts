import { Injectable } from '@angular/core';
import { HttpService, SettingsService } from '../common/index';
import { TreeNode } from 'primeng/components/common/treenode';
import { Property, SemNotam } from './query';
import { Parameter } from '../parameter/parameter';

@Injectable()
export class QueryService {

    constructor(
        private httpService: HttpService,
        private settingsService: SettingsService
    ) { }

    public getISpec(): Promise<Object> {
        return this.httpService.get<Object>(this.settingsService.serverPath + 'query/ispec');
    }

    public getSemNotams(): Promise<Array<SemNotam>> {
        return this.httpService.get<Array<SemNotam>>(this.settingsService.serverPath + 'query');
    }

    public updateIspec(ispec :Object): Promise<Object> {
        return this.httpService.post<Object>(this.settingsService.serverPath + 'query/ispec', ispec);
    }
}
