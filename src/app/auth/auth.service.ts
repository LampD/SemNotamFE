import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from './auth';
import { AuthManager } from './auth-manager.service'

@Injectable()
export class AuthService {

    constructor(
        private authManager: AuthManager, 
        private route: Router
    ) { }

    public get isUserLoggedIn(): boolean {
        const token = sessionStorage.getItem(AuthConstants.USERID);
        return token != null;
    }

    public async login(email: string, password: string): Promise<void> {
        const user = await this.authManager.login(email, password);
        sessionStorage.setItem('UserId', user.id + '');
        sessionStorage.setItem('Role', user.role);
    }

    public async logout(logoutFromServer: boolean): Promise<void> {
        sessionStorage.removeItem(AuthConstants.USERID);
        sessionStorage.removeItem(AuthConstants.ROLE);
        this.route.navigate(['/login']);
    }
}
