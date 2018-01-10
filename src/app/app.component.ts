import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LoadingIndicatorService } from './common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    public title: string = 'app';
    public width: number;
    public isLoading: boolean;

    constructor(
        private loadingIndicatorService: LoadingIndicatorService
    ) { }

    ngOnInit(): void {
        this.width = window.innerWidth - 250;

        this.loadingIndicatorService.loaderStatus.subscribe((val: boolean) => {
            this.isLoading = val;
        });
    }
}
