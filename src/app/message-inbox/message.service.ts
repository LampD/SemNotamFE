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
        return this.http.get<Array<Message>>(this.settingsService.serverPath + 'message');
    }
}
