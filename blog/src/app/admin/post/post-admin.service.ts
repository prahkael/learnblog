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

import { Post }                 from '../../public/post/post';
import { PostPublicService }    from '../../public/post/post-public.service';

// *****************************************************************************
// Service
// *****************************************************************************

@Injectable()
export class PostAdminService extends PostPublicService {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  createPost(post: Post) {
    this._httpClient
        .post('/api/posts', { data: { post } })
        .map((result: any) => result.data && result.data.post)
        .subscribe((objPostCreated: any) => {

      this._posts.push(new Post(objPostCreated));
      this._posts$.next(this._posts);
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
          this._posts$.next(this._posts);
        });
  }

  // ***************************************************************************

  deletePost(id: string) {
    this._httpClient
        .delete('/api/posts/' + id)
        .subscribe(() => {
          this._posts = [ ...this._posts.filter((postCurr: Post) =>
              postCurr._id !== id) ];
          this._posts$.next(this._posts);
        });
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************
}
