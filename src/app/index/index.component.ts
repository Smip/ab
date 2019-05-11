import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../shared/services/posts.service';
import {Post} from '../shared/models/post.model';
import {from, Subscription} from 'rxjs';
import {concatAll, filter, map} from 'rxjs/operators';
import {toast} from '@smip/ngx-materialize';
import {slideStateTrigger} from '../shared/animations/slide.animation';

@Component({
  selector: 'ab-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [slideStateTrigger],
})
export class IndexComponent implements OnInit, OnDestroy {

  posts: Post[];
  isLoaded = false;
  subscription2: Subscription;
  subscription: Subscription;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoaded = false;
    this.subscription = this.postsService.getPosts({
      number: 3,
      offset: Math.floor(Math.random() * 1000), // get random 3 posts, only for demonstration
    }).subscribe(response => {
      this.posts = response.posts;
      this.isLoaded = true;
    }, error => {
      toast({html: 'An error occurred during the download, please try again later.'});
      this.isLoaded = true;
      console.log(error);
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
    this.subscription2 = from(this.posts).pipe(
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
      concatAll(), // collect observables and subscribe to next when previous completes
    ).subscribe(response => {
        const post = this.posts.find(element => element.ID === response[0]); // find the post to which received comments
        post.comments = <Comment[]> response[1].comments.slice(0, 1); // leave only first post
        post.comments_loading = false;
        post.comments_load = true;
      },
      error => {
        toast({html: 'An error occurred during the download, please try again later.'});
        console.log(error);
        this.posts.forEach(post => {
          if (post.discussion.comment_count > 0) {
            post.comments_loading = false;
          }
        });
      },
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
