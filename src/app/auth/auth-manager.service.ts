import { Injectable } from '@angular/core';
import { HttpService, SettingsService } from '../common/index';
import { User } from '../user';

@Injectable()
export class AuthManager {

    constructor(
        private http: HttpService,
        private settingsService: SettingsService
    ) { }

    public login(email: string, password: string): Promise<User> {
        return Promise.resolve({
            "id": 1,
            "name": "dominik",
            "role": "RuleDeveloper",
            "email": "dominik.lamprecht@icloud.com"
        });
        return this.http.get<User>(this.settingsService.serverPath + 'User/1');
    }
}
