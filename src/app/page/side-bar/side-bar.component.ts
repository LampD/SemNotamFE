import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {

    public colorMessage: string;
    public colorContext: string;
    public colorParameter: string;
    public colorNotam: string;
    public colorTransaction: string;

    private  updateSubscription: Subscription;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location
    ) { }

    public ngOnInit() {   
        this.updateSubscription = this.router.events
            .subscribe((value: NavigationEnd) => {
                this.updateColor();
            });
    }

    public ngOnDestroy(): void {
        if(this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
    }

    public get isUserLoggedIn(): boolean {
        return sessionStorage.getItem('UserId') != null ? true : false;
    }

    public updateColor(): void {
        this.colorMessage = this.location.path().includes('messages') ? 'red' : 'white';
        this.colorContext = this.location.path().includes('contexts') ? 'red' : 'white';
        this.colorParameter = this.location.path().includes('parameters') ? 'red' : 'white';
        this.colorNotam = this.location.path().includes('notams') ? 'red' : 'white';
        this.colorTransaction = this.location.path().includes('transaction') ? 'red' : 'white';
    }

    public logout(): void {
        sessionStorage.removeItem('UserId');
        sessionStorage.removeItem('Role');

        this.router.navigate(['login']);
    }
}
