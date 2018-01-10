import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import {
    DataTableModule,
    SharedModule,
    DropdownModule,
    TreeTableModule,
    TreeNode
} from 'primeng/primeng';
import { SelectModule } from 'angular2-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login';
import {
    SideBarComponent,
    HeaderComponent
} from './page';
import {
    MessageInboxComponent,
    MessageService,
    MessageDetailComponent
} from './message-inbox';
import { ContextComponent } from './context';
import { ParameterComponent } from './parameter';
import { NotamComponent } from './notam';
import { TransactionComponent } from './transaction';
import {
    HttpService,
    SettingsService,
    LoadingIndicatorComponent,
    LoadingIndicatorService
} from './common';
import {
    AuthManager,
    AuthService
} from './auth';
import { AuthGuard } from './auth/auth.guard';
import { NewMessageComponent } from './message-inbox/new-message/new-message.component';
import { UserService } from './user';
import {ParameterService} from './parameter/parameter.service';
import { ParameterDetailComponent } from './parameter/parameter-detail/parameter-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SideBarComponent,
        HeaderComponent,
        MessageInboxComponent,
        ContextComponent,
        ParameterComponent,
        NotamComponent,
        TransactionComponent,
        LoadingIndicatorComponent,
        MessageDetailComponent,
        NewMessageComponent,
        ParameterDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SelectModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        AngularFontAwesomeModule,
        ToastrModule,
        HttpModule,
        HttpClientModule,
        DataTableModule,
        SharedModule,
        DropdownModule,
        TreeTableModule
    ],
    providers: [
        SettingsService,
        HttpService,
        AuthManager,
        AuthService,
        AuthGuard,
        LoadingIndicatorService,
        MessageService,
        ParameterService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
