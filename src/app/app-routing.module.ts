import { NgModule }             from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';

import { LoginComponent } from '../app/login';
import { MessageInboxComponent, MessageDetailComponent, NewMessageComponent } from './message-inbox/index';
import { ParameterComponent } from './parameter/index';
import { NotamComponent } from './notam/index';
import { TransactionComponent } from './transaction/index';
import { AuthGuard } from './auth/auth.guard';
import {ParameterDetailComponent} from './parameter/parameter-detail/parameter-detail.component';
import { ContextComponent } from './context/context.component';
import { ContextDetailComponent } from './context/context-detail/context-detail.component';

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
        path: 'message',
        component: MessageDetailComponent,
        canActivate: [ AuthGuard ],
    },
    {
        path: 'newMessage',
        component: NewMessageComponent,
        canActivate: [ AuthGuard ],
    },
    {
        path: 'contexts',
        component: ContextComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'contextDetail',
        component: ContextDetailComponent,
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
    },
    {
      path: 'parameterDetails',
      component: ParameterDetailComponent,
      canActivate: [ AuthGuard ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
