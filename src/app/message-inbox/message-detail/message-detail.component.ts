import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'message-detail',
    templateUrl: './message-detail.component.html',
    styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

    public message: Message;

    private messageId: number;

    constructor(
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute
    ) { }

    public async ngOnInit() {
        this.activatedRoute
        .queryParams
        .subscribe(params => {
            this.messageId = +params['id'];
        });

        this.message = await this.messageService.loadMessage(this.messageId);
    }
}
