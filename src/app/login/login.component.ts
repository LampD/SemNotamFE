import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/index';
import { LoadingIndicatorService } from '../common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public email: string;
    public password: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        private loadingIndicatorService: LoadingIndicatorService
    ) { }

    ngOnInit() {
    }

    public async login() {
        this.loadingIndicatorService.displayLoader(true);
        await this.authService.login(this.email, this.password);

        this.loadingIndicatorService.displayLoader(false);
        this.router.navigate(['/messages']);
    }
}
