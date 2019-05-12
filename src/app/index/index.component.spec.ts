import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {LoaderComponent} from '../shared/components/loader/loader.component';
import {DebugElement, Pipe, PipeTransform} from '@angular/core';
import {PostsService} from '../shared/services/posts.service';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {Post} from '../shared/models/post.model';
import {Comment} from '../shared/models/comment.model';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

@Pipe({name: 'moment'})
class MockPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}


describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let debugElement: DebugElement;
  let postsService: PostsService;
  let spyPosts: jasmine.Spy;
  let spyCommets: jasmine.Spy;
  let mockPost: Post;
  let mockComment: Comment;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NoopAnimationsModule],
      declarations: [IndexComponent, LoaderComponent, MockPipe],
      providers: [PostsService],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    postsService = fixture.debugElement.injector.get(PostsService);
    mockPost = new Post(
      123,
      {name: 'authorName'},
      '2017',
      'Test title',
      '<h2>Test</h2>',
      {comment_count: 3},
    );
    mockComment = new Comment(
      {name: 'authorName'},
      '<h2>Test</h2>',
    );

    spyPosts = spyOn(postsService, 'getPosts').and.returnValue(of({'posts': [mockPost, mockPost, mockPost]}));
    spyCommets = spyOn(postsService, 'getCommentToPost').and.returnValue(of({'comments': [mockComment, mockComment, mockComment]}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call post service to get posts', () => {
    expect(spyPosts.calls.any()).toBeTruthy();
  });

  it('should set posts', () => {
    expect(component.posts).toEqual([mockPost, mockPost, mockPost]);
  });

  it('should call post service to get comments 3 times', () => {
    debugElement
      .query(By.css('button#getComments'))
      .triggerEventHandler('click', null);
    expect(spyCommets.calls.count()).toBe(3);
  });
});
