import {inject, TestBed} from '@angular/core/testing';
import {PostsService} from './posts.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
  });

  it('should be created', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));

});
