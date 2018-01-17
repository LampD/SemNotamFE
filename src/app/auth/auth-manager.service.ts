import { Injectable } from '@angular/core';
import { HttpService, SettingsService } from '../common/index';
import { User } from '../user';

@Injectable()
export class AuthManager {

    constructor(
        private http: HttpService,
        private settingsService: SettingsService
    ) { }

    public login(username: string, password: string): Promise<User> {
        return this.http.post<User>(this.settingsService.serverPath + 'users/login', {username, password});
    }
}
