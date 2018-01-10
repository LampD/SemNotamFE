import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message-inbox/index';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/components/common/treenode';
import { ContextService } from './context.service';
import { ParameterType } from './context';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit {

    public columns: Array<ParameterType>;
    public contexts: Array<TreeNode>;

    constructor(
        private contextService: ContextService,
        private router: Router
    ) { }

    public async ngOnInit() {
        this.columns = await this.contextService.getParameterNames();
        this.contexts = await this.contextService.getContextHierachy();
    }

    public navigateToDetail(treeItem): void {
        this.router.navigate(['contextDetail'], { queryParams: { id: treeItem.data.id } });
    }

    public newContext(): void {
        this.router.navigate(['newMessage']);
    }
}
