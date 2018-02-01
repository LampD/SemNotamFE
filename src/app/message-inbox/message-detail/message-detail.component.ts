import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    public async ngOnInit() {
        this.activatedRoute
        .queryParams
        .subscribe(params => {
            this.messageId = +params['id'];
        });

        this.message = await this.messageService.loadMessage(this.messageId);
    }

    public async acknowledgeMessage() {
        this.message.acknowledged = true;
        await this.messageService.updateMessage(this.message);
        this.router.navigate(['messages']);
    }

    
    public navigateToAffectedElement(message :Message): void {
        if (message.affectedElementType === "Context") {
            this.router.navigate(['contextDetail'], { queryParams: { id: message.affectedElement } });
        } else if (message.affectedElementType === "Parameter") {
            this.router.navigate(['parameterDetails'], { queryParams: { id: message.affectedElement } });
        }
    }
}
