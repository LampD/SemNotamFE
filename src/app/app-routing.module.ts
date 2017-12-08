import { NgModule }             from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';

import { LoginComponent } from '../app/login';
import { MessageInboxComponent } from './message-inbox/index';
import { ContextComponent } from './context/index';
import { ParameterComponent } from './parameter/index';
import { NotamComponent } from './notam/index';
import { TransactionComponent } from './transaction/index';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'messages',
        component: MessageInboxComponent
    },
    {
        path: 'contexts',
        component: ContextComponent
    },
    {
        path: 'parameters',
        component: ParameterComponent
    },
    {
        path: 'notams',
        component: NotamComponent
    },
    {
        path: 'transaction',
        component: TransactionComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}