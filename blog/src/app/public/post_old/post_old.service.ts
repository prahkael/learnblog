// *****************************************************************************
// Imports
// *****************************************************************************

import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';

import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { Subject }              from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { createMockedPosts }    from './post-list.mock';

import { Post }                 from './post';

// *****************************************************************************
// Service
// *****************************************************************************

/**
 * Class of the post service.
 *
 * @class
 * @author Thomas Fuchs <thomas.fuchs@net-designer.net>
 */
@Injectable()
export class PostService {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  /**
   * Public property of the posts behaviour subject.
   *
   * @type {BehaviorSubject<Array<Post>>}
   */
  posts$: BehaviorSubject<Array<Post>>;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  private _posts: Array<Post>;

  // ***************************************************************************
  // Static methods
  // ***************************************************************************

  constructor(private _httpClient: HttpClient) {
    this.readPosts();
    this.posts$ = new BehaviorSubject(this._posts);
  }

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  getPostsAsObservable() {
    return this.posts$.asObservable();
  }

  // ***************************************************************************

  createPost(post: Post) {
    this._httpClient
        .post('/api/posts', { data: { post } })
        .map((result: any) => result.data && result.data.post)
        .subscribe((objPostCreated: any) => {

      this._posts.push(new Post(objPostCreated));
      this.posts$.next(this._posts);
    });
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
      this.posts$.next(this._posts);
    });
  }

  // ***************************************************************************

  updatePost(post: Post) {
    this._httpClient.put('/api/posts/' + post._id, { data: { post } })
        .map((data: any) => data.data)
        .map((data: any) => data.post)
        .subscribe((postRaw: any) => {
          this._posts = [ ...this._posts.filter((postCurr: Post) =>
              postCurr._id !== postRaw._id), postRaw ];
          this.posts$.next(this._posts);
        });
  }

  // ***************************************************************************

  deletePost(id: string) {
    this._httpClient
        .delete('/api/posts/' + id)
        .subscribe(() => {
          this._posts = [ ...this._posts.filter((postCurr: Post) =>
              postCurr._id !== id) ];
          this.posts$.next(this._posts);
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
          this.posts$.next(this._posts);
        });
  }
}
