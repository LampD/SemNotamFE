import { Injectable } from '@angular/core';

export interface ISettings {
    serverPath: string;
}

@Injectable()
export class SettingsService implements ISettings {
    public serverPath = 'http://127.0.0.1:8080/';
}
