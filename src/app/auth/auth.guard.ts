import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    async canActivate() {
        try {
        if (sessionStorage.getItem('UserId') != null) {
            return true;
        }
        else {
            this.router.navigate(['login']);
            return false;
        }
        } catch(e) {
            this.router.navigate(['login']);
            return false;
        }
    }
}
