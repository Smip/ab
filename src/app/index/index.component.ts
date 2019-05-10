import {Component, OnInit} from '@angular/core';
import {PostsService} from '../shared/services/posts.service';
import {Post} from '../shared/models/post.model';
import {from} from 'rxjs';
import {concatAll, filter, map} from 'rxjs/operators';

@Component({
  selector: 'ab-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  posts: Post[];
  isLoaded = false;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoaded = false;
    this.postsService.getPosts({
      number: 3,
      offset: Math.floor(Math.random() * 1000), // get random 3 posts, only for demonstration
    }).subscribe(response => {
      this.posts = response.posts;
      this.isLoaded = true;
    }, error => {

    });
  }

  loadComents() {
    this.posts.forEach(post => {
      if (post.discussion.comment_count > 0) {
        post.comments_loading = true;
      } else {
        post.comments_load = true;   // if post has no comments
                                     // set comments_load=true to show info "no comments"
      }


    });
    from(this.posts).pipe(
      filter(post => post.discussion.comment_count > 0), // filter posts without comments
      map(
        post => this.postsService.getCommentToPost(post.ID)
                    .pipe(
                      map(response => {
                          return [post.ID, response];
                        },
                      ),
                    ),
      ),
      concatAll(),
    ).subscribe(response => {
        console.log(response);
        const post = this.posts.find(element => element.ID === response[0]);
        post.comments = <Comment[]> response[1].comments.slice(0, 1);
        post.comments_loading = false;
        post.comments_load = true;

        // val[0]
      },
    );
  }
}
