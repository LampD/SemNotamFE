import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
import { SettingsService } from '../common/settings.service';
import { ComposedOperation, AllowedOpertions } from './transaction';

@Injectable()
export class TransactionService {

    constructor(
        private http: HttpService,
        private settingsService: SettingsService
    ) { }

    public getComposedOperationHierarchy(): Promise<ComposedOperation> {
        return this.http.get<ComposedOperation>(this.settingsService.serverPath + 'operations/hierarchy');
    }

    public getAllowedOperations(): Promise<AllowedOpertions> {
        return this.http.get<AllowedOpertions>(this.settingsService.serverPath + 'operations/allowed');
    }
}
