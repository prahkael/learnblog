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

  constructor(private http: HttpClient) {
    // this._posts = createMockedPosts().map(post => new Post(post));

    // create subjects and initialize the posts subject with the local posts array
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
    this.http
        .post('/api/posts', { data: { post } })
        .map((data: any) => data.json())
        .subscribe((objPostCreated: any) => {

      this._posts.push(new Post(objPostCreated));
      this.posts$.next(this._posts);
    });
  }

  // ***************************************************************************

  readPost(id: string) {
    return this._posts.find((post: Post) => post._id === id);
  }

  // ***************************************************************************

  readPosts() {
    return this.http
        .get('/api/posts')
        .map((data: any) => data.json())
        .subscribe((postsRaw: Array<any>) => {

      this._posts = postsRaw.map(objPost => new Post(objPost));
      this.posts$.next(this._posts);
    });
  }

  // ***************************************************************************

  updatePost(post: Post) {
    this.http.put('/api/posts/' + post._id, { data: { post } })
        .map((data: any) => data.json())
        .map((data: any) => data.post)
        .subscribe((postRaw: any) => {
          this._posts = [ ...this._posts.filter((postCurr: Post) =>
              postCurr._id !== postRaw._id), postRaw ];
          this.posts$.next(this._posts);
        });
  }

  // ***************************************************************************

  deletePost(id: string) {
    this.http
        .delete('/api/posts/' + id)
        .subscribe(() => {
          this._posts = [ ...this._posts.filter((postCurr: Post) =>
              postCurr._id !== id) ];
          this.posts$.next(this._posts);
        });
  }
}
