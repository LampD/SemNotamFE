import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { LoadingIndicatorService } from '../common/index';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'message-inbox',
  templateUrl: './message-inbox.component.html',
  styleUrls: ['./message-inbox.component.scss']
})
export class MessageInboxComponent implements OnInit {

    public messages: Array<Message> = [];

    constructor(
        private loadingIndicatorService: LoadingIndicatorService,
        private messageService: MessageService,
        private router: Router
    ) { }

    public async ngOnInit() {
        this.messages = await this.messageService.loadMessages();
    }

    public navigateToDetail(event): void {
        this.router.navigate(['message'], { queryParams: { id: event.data.id } });
    }
}
