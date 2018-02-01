import { Injectable } from '@angular/core';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

@Injectable()
export class NotificationService {

  constructor(
    private toastrService: ToastrService
  ) {
    this.toastrService.toastrConfig.enableHtml = true; 
  }

  public success(title: string, info: string): void {
    this.toastrService.success(info, title);
  }

  public info(title: string, info: string): void {
    this.toastrService.info(info, title);
  }

  public warning(title: string, info: string): void {
    this.toastrService.warning(info, title);
  }

  public error(title: string, info: string): void {
    this.toastrService.error(info, title);
  }
}
