import { NgModule }             from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';

import { LoginComponent } from '../app/login';
import { MessageInboxComponent } from './message-inbox/index';
import { ContextComponent } from './context/index';
import { ParameterComponent } from './parameter/index';
import { NotamComponent } from './notam/index';
import { TransactionComponent } from './transaction/index';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'messages',
        component: MessageInboxComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'contexts',
        component: ContextComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'parameters',
        component: ParameterComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'notams',
        component: NotamComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'transaction',
        component: TransactionComponent,
        canActivate: [ AuthGuard ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}