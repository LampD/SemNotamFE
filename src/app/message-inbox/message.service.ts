import { Injectable } from '@angular/core';
import { HttpService, SettingsService } from '../common';
import { Message } from './message';

@Injectable()
export class MessageService {

    constructor(
        private http: HttpService,
        private settingsService: SettingsService
    ) { }

    public loadMessages(): Promise<Array<Message>> {
        return this.http.get<Array<Message>>(this.settingsService.serverPath + 'messages');
    }

    public loadMessage(id: number): Promise<Message> {
        return this.http.get<Message>(this.settingsService.serverPath + 'messages/' + id);
    }

    public sendMessage(message: Message): Promise<Message> {
        return this.http.post<Message>(this.settingsService.serverPath + 'messages', message);
    }

    public updateMessage(message: Message): Promise<Message> {
        return this.http.put<Message>(this.settingsService.serverPath + 'messages/' + message.id, message);
    }
}
