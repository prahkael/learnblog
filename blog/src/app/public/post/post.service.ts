// *****************************************************************************
// Imports
// *****************************************************************************

import { Injectable }           from '@angular/core';

import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { Subject }              from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators';

import { createMockedPosts }    from './post-list.mock';

import { Post, IPost }          from './post';

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

  private _posts: any;

  // ***************************************************************************
  // Static methods
  // ***************************************************************************

  /**
   * Constructor.
   *
   * @constructor
   * @return {PostService}   instance of the post service
   */
  constructor() {
    this._posts = createMockedPosts().map(post => new Post(post));

    // create subjects and initialize the posts subject with the local posts array
    this.posts$ = new BehaviorSubject(this._posts);
  }

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  /**
   * Public method to create a new post in the post list.
   *
   * @param {IPost} objPost object of post data to create a new post
   */
  createPost(objPost: IPost) {
    this._posts = [ ...this._posts, new Post(objPost) ];
    this.posts$.next(this._posts);
  }

  // ***************************************************************************

  /**
   * Public method to read one post by a given id.
   *
   * @param  {string} id id of the post to be returned
   * @return {Post}      post to be looked for
   */
  readPost(id: string): Post {
    return this._posts.find((post: Post) => post._id === id);
  }

  // ***************************************************************************

  /**
   * Public method to read all posts in posts list as as observable.
   *
   * @return {Array}
   */
  // readPosts() {
  //   return this._posts;
  // }

  /**
   * Public method to read all posts in posts list as as observable.
   *
   * @return {Obserable<Array<Post>>} obserable of array of posts
   */
  readPosts() {
    return this.posts$.asObservable();
  }

  // ***************************************************************************

  /**
   * Public method to update one given post.
   *
   * @param {IPost} objPost     object of the post to be updated
   * @param {IPost} objPost._id id of the post to be updated
   */
  updatePost(objPost: IPost) {
    console.log(`>>> debug: objPost: `, objPost);
    this._posts = this._posts.map(postCurr =>
        objPost._id === postCurr._id ? { ...postCurr, ...objPost } : postCurr);
    this.posts$.next(this._posts);
  }

  /**
   * Public method to delete one post by a given ID.
   *
   * @param {string} id id of the post to be deleted
   */
  deletePost(id: string) {
    this._posts = this._posts.filter(post => post._id !== id);
    this.posts$.next(this._posts);
  }
}
