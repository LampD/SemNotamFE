import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

    private router: Router;

    constructor(
        private http: Http,
        private injector: Injector
    ) { }

  private addAuthHeaderToOptions(options): any {
    if (!options) {
      options = {};
    }

    let user = JSON.parse(sessionStorage.getItem('User'));
    if (user) {
      if (options.headers) {
        options.headers.append({ 'User': user.id });
      } else {
        const headers = new Headers({ 'User': user.id });
        options.headers = headers;
      }
    }
    return options;
  }

    public get<T>(url: any, options?: any): Promise<T> {
      options = this.addAuthHeaderToOptions(options);
        return <Promise<T>>this.http.get(url, options)
            .map(this.extractData)
            .catch((e, o) => this.catchError(e))
            .toPromise();
    }

    public post<T>(url: any, data: any, options?: any): Promise<T> {
      options = this.addAuthHeaderToOptions(options);
        return <Promise<T>>this.http.post(url, data, options)
            .map(this.extractData)
            .catch((e, o) => this.catchError(e))
            .toPromise();
    }

    public put<T>(url: any, data: any, options?: any): Promise<T> {
      options = this.addAuthHeaderToOptions(options);
        return <Promise<T>>this.http.put(url, data, options)
            .map(this.extractData)
            .catch((e, o) => this.catchError(e))
            .toPromise();
    }

    public delete<T>(url: any, options?: any): Promise<T> {
      options = this.addAuthHeaderToOptions(options);
        return <Promise<T>>this.http.delete(url, options)
            .map(this.extractData)
            .catch((e, o) => this.catchError(e))
            .toPromise();
    }

    private extractData<T>(res: Response): T {
        try {
            const body = res.json();
            return body;
        } catch (e) {
            return <any>res.toString();
        }
    }

    private catchError(err: any): Observable<{}> {
        if (this.router == null) {
            this.router = this.injector.get(Router);
        }

        if (err.status === 401) {
            this.router.navigate(['login']);
        }

        return Observable.throw(err);
    }
}
