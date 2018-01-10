import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/index';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public width: number;

    constructor(
        private authService: AuthService
    ) { }
    
    ngOnInit() {
        this.width = window.innerWidth - 250;
    }

    public get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.name : '';
    }
}
