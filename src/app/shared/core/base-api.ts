import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BaseApi {
  private baseUrl = 'http://localhost/';

  constructor(public http: HttpClient) {
  }

  public get(url: string = '', data: any = {}): Observable<any> {
    return this.http.get(this.getUrl(url), {params: data});
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data);
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data);
  }

  public delete(url: string = ''): Observable<any> {
    return this.http.delete(this.getUrl(url));
  }

  public getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }
}
