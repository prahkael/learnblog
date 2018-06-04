// *****************************************************************************
// Imports
// *****************************************************************************

import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';

// *****************************************************************************

import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { Subject }              from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/add/operator/map';

// *****************************************************************************

import { Post }                 from './post';
import { Comment }              from './comment';

// *****************************************************************************
// Service
// *****************************************************************************

@Injectable()
export class PostPublicService {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  // ***************************************************************************
  // Protected properties
  // ***************************************************************************

  protected _posts$   : BehaviorSubject<Array<Post>>;
  protected _posts    : Array<Post>;
  protected _comments$: BehaviorSubject<Array<Comment>>;
  protected _comments : Array<Comment>;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  // ***************************************************************************
  // Constructor
  // ***************************************************************************

  constructor(protected _httpClient: HttpClient) {
    this.readPosts();
    this._posts$    = new BehaviorSubject(this._posts);
    this._comments$ = new BehaviorSubject(this._comments);
  }

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  getPostsAsObservable() {
    this.readPosts();
    return this._posts$.asObservable();
  }

  // ***************************************************************************

  getCommentsAsObservable() {
    this.readComments();
    return this._comments$.asObservable();
  }

  // ***************************************************************************

  readPost(id: string) {
    return this._httpClient
        .get('/api/posts/' + id)
        .map((result: any) => result.data && result.data.post)
        ;
  }

  // ***************************************************************************

  readPosts(sortKey?: string) {
    if (!sortKey) {
      sortKey = 'updatedAt';
    }

    return this._httpClient
        .get('/api/posts?sort=' + sortKey)
        .map((result: any) => {
          return result.data && result.data.posts;
        })
        .subscribe((postsRaw: Array<any>) => {

      this._posts = postsRaw.map(objPost => new Post(objPost));
      this._posts$.next(this._posts);
    });
  }

  // ***************************************************************************

  readComments(sortKey?: string) {
    if (!sortKey) {
      sortKey = 'updatedAt';
    }

    return this._httpClient
        .get('/api/comments?sort=' + sortKey)
        .map((result: any) => {
          return result.data && result.data.comments;
        })
        .subscribe((postsRaw: Array<any>) => {

      this._comments = postsRaw.map(objComment => new Comment(objComment));
      this._comments$.next(this._comments);
    });
  }

  // ***************************************************************************

  createComment(id, comment) {
    this._httpClient
        .put('/api/posts/' + id + '/comments', { data: { comment } })
        .map((data: any) => data.data)
        .map((data: any) => data.post)
        .subscribe((postRaw: any) => {
          this._posts = [ ...this._posts.filter((postCurr: Post) =>
              postCurr._id !== postRaw._id), postRaw ];
          this._posts$.next(this._posts);
        });
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************

  // ***************************************************************************
}
