import {Injectable} from '@angular/core';
import {BaseApi} from '../core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class PostsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getPosts(data = {}): Observable<any> {
    return this.get(`posts`, data);
  }

  getCommentToPost(postId, data = {}): Observable<any> {
    return this.get(`posts/${postId}/replies/`, data);
  }

}
