import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/index';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public width: number;

    constructor(
        private authService: AuthService
    ) { }

    public get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.name : '';
    }
}
