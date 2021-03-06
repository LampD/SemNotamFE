import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService, ToastrConfig } from 'ngx-toastr';

import {
    DataTableModule,
    SharedModule,
    DropdownModule,
    TreeTableModule,
    TreeNode,
    FieldsetModule,
    DialogModule,
    ScrollPanelModule,
} from 'primeng/primeng';

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
import { ParameterComponent } from './parameter';
import { NotamComponent } from './notam';
import { TransactionComponent } from './transaction';
import {
    HttpService,
    SettingsService,
    LoadingIndicatorComponent,
    LoadingIndicatorService,
    NotificationService
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
import { ContextComponent } from './context/context.component';
import { ContextService } from './context/context.service';
import { QueryService } from './notam/query.service';
import { ContextDetailComponent } from './context/context-detail/context-detail.component';
import { AddUpdateContextDialogComponent } from './context/add-update-context-dialog/add-update-context-dialog.component';
import { AddRuleDeveloperDialogComponent } from './context/add-rule-developer-dialog/add-rule-developer-dialog.component';
import { AddUpdateRuleDialogComponent } from './context/add-update-rule-dialog/add-update-rule-dialog.component';
import { AddParameterValueDialogComponent } from './parameter/add-parameter-value-dialog/add-parameter-value-dialog.component';
import { AddParameterDialogComponent } from './parameter/add-parameter-dialog/add-parameter-dialog.component';
import { DeContextualizeDialogComponent } from './context/de-contextualize-dialog/de-contextualize-dialog.component';
import { TransactionService } from './transaction/transaction.service';



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
        ContextDetailComponent,
        AddUpdateContextDialogComponent,
        ParameterDetailComponent,
        AddRuleDeveloperDialogComponent,
        AddUpdateRuleDialogComponent,
        AddParameterValueDialogComponent,
        AddParameterDialogComponent,
        DeContextualizeDialogComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        AngularFontAwesomeModule,
        ToastrModule.forRoot(),
        HttpModule,
        HttpClientModule,
        DataTableModule,
        SharedModule,
        DropdownModule,
        TreeTableModule,
        FieldsetModule,
        DialogModule,
        ScrollPanelModule,
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
        UserService,
        UserService,
        ContextService,
        QueryService,
        NotificationService,
        ToastrService,
        TransactionService,
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
