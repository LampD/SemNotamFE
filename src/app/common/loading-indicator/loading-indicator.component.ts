import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  @Input() public isLoading: boolean;
  @Input() public size?: string;
  public sizeString: string;

  public ngOnInit(): void {
    if (this.size) {
      switch (this.size) {
        case 'small' : this.sizeString = "20px";
          break;
        case 'medium' : this.sizeString = "50px";
          break;
        case 'large' : this.sizeString = "100px";
          break;
        default: this.sizeString = 10 + 'em';;
          break;
      }
    } else {
      this.sizeString = 10 + 'em';
    }
  }

}
