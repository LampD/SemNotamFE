import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from './auth';
import { AuthManager } from './auth-manager.service'
import { User } from '../user/user';

@Injectable()
export class AuthService {

    public currentUser: User;
    constructor(
        private authManager: AuthManager, 
        private route: Router
    ) { }

    public get isUserLoggedIn(): boolean {
        const token = sessionStorage.getItem(AuthConstants.USERID);
        return token != null;
    }

    public async login(email: string, password: string): Promise<void> {
        this.currentUser = await this.authManager.login(email, password);
        sessionStorage.setItem('UserId', this.currentUser.id + '');
        sessionStorage.setItem('Role', this.currentUser.role);
    }

    public async logout(logoutFromServer: boolean): Promise<void> {
        sessionStorage.removeItem(AuthConstants.USERID);
        sessionStorage.removeItem(AuthConstants.ROLE);
        this.route.navigate(['/login']);
    }
}
