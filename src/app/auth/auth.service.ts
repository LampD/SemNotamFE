import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from './auth';
import { AuthManager } from './auth-manager.service'
import { User } from '../user/user';

@Injectable()
export class AuthService {

    private _currentUser: User;
    constructor(
        private authManager: AuthManager, 
        private route: Router,
    ) { 
    }

    public isUserLoggedIn(): boolean {
        const token = this.currentUser.id;
        return token != null;
    }

    public get currentUser(): User {
        return this._currentUser || JSON.parse(sessionStorage.getItem('User'));
    }

    public async login(email: string, password: string): Promise<void> {
        debugger;
        this._currentUser = await this.authManager.login(email, password);
        sessionStorage.setItem('User', JSON.stringify(this.currentUser));
        sessionStorage.setItem('Role', this.currentUser.role);
    }

    public async logout(logoutFromServer: boolean): Promise<void> {
        sessionStorage.removeItem('User');
        sessionStorage.removeItem(AuthConstants.ROLE);
        this.route.navigate(['/login']);
    }
}
