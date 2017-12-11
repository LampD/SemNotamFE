import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { LoadingIndicatorService } from '../common/index';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message-inbox',
  templateUrl: './message-inbox.component.html',
  styleUrls: ['./message-inbox.component.scss']
})
export class MessageInboxComponent implements OnInit {

    public messages: Array<Message> = [];

    constructor(
        private loadingIndicatorService: LoadingIndicatorService,
        private messageService: MessageService
    ) { }

    public async ngOnInit() {
        this.loadingIndicatorService.displayLoader(true);

        //this.messages = await this.messageService.loadMessages();

        this.loadingIndicatorService.displayLoader(false);
    }
}
