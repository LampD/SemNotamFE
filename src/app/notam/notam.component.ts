import { Component, OnInit } from '@angular/core';
import { QueryService } from './query.service';
import { Property, SemNotam } from './query';

@Component({
  selector: 'app-notam',
  templateUrl: './notam.component.html',
  styleUrls: ['./notam.component.scss']
})
export class NotamComponent implements OnInit {

    public isLoading: boolean;
    public iSpec: Object;
    public semNotams: Array<SemNotam>;

    constructor(
      private queryService: QueryService,
    ) { }

    public async ngOnInit() {
        this.isLoading = true;

        try {
            this.iSpec = await this.queryService.getISpec();
            this.semNotams = await this.queryService.getSemNotams();
        } catch(e) {
            // TODO notification
        } finally {
            this.isLoading = false;
        }
    }

    public async onSubmit() {
        await this.queryService.updateIspec(this.iSpec);
        this.semNotams = await this.queryService.getSemNotams();
    }
}