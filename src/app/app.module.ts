import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login';
import { 
    SideBarComponent,
    HeaderComponent 
} from './page';
import { MessageInboxComponent } from './message-inbox';
import { ContextComponent } from './context';
import { ParameterComponent } from './parameter';
import { NotamComponent } from './notam';
import { TransactionComponent } from './transaction';


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
        TransactionComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        AngularFontAwesomeModule,
        ToastrModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
