import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
import { SettingsService } from '../common/settings.service';
import { User } from './user';

@Injectable()
export class UserService {

    constructor(
        private http: HttpService,
        private settingsService: SettingsService
    ) { }

    public getUsers(): Promise<Array<User>> {
        return this.http.get<Array<User>>(this.settingsService.serverPath + 'User');
    }

    public getNotAssignedRuleDevelopers(contextId: number): Promise<Array<User>> {
        return this.http.get<Array<User>>(this.settingsService.serverPath + 'User');
    }
}
