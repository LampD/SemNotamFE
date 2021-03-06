import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { LoadingIndicatorService } from '../common/index';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { Header } from 'primeng/primeng';
import { HeaderComponent } from '../page/index';
import { inject } from '@angular/core/testing';

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

    public newMessage(): void {
        this.router.navigate(['newMessage']);
    }

    public navigateToAffectedElement(message :Message): void {
        if (message.affectedElementType === "Context") {
            this.router.navigate(['contextDetail'], { queryParams: { id: message.affectedElement } });
        } else if (message.affectedElementType === "Parameter") {
            this.router.navigate(['parameterDetails'], { queryParams: { id: message.affectedElement } });
        }
    }

    
}
