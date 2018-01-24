import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../../auth/index';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

@Injectable()
export class HeaderComponent {

    public width: number;
    public action: string;
    public transactionState: string;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute, 
        private router: Router
    ) { 
        // router.events.subscribe(() => {
        //     this.transactionState = 'state';
        // });
    }


    public get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.name : '';
    }

    public get getCurrentAction(): string {
        let id: string = null;
        
        this.route.queryParams.subscribe(p => {
            id = p['id'];
        });
        if(id) {
            return id;
        }else{
            id = this.router.url;
            id = id.slice(1);
            if(id == "login"){
                return "";
            }
            return id;
        }
    }
}
