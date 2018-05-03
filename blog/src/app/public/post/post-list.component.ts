// *****************************************************************************
// Imports
// *****************************************************************************

import { Component }         from '@angular/core';
import { OnInit }            from '@angular/core';

import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { Observable }        from 'rxjs/Observable';

import { PostService }       from './post.service';
import { UserService }       from '../user/user.service';
import { Post }              from './post';

import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';

// *****************************************************************************
// Class
// *****************************************************************************

/**
 * Class of the post component.
 *
 * @class
 * @author Thomas Fuchs <thomas.fuchs@net-designer.net>
 */
@Component({
  selector     : 'post-list',
  templateUrl  : 'post-list.component.html',
  styleUrls    : ['post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  posts: any;

  auth: BehaviorSubject<boolean>;

  /**
   * Public property of the posts list subject. This subject is used in other
   * views as observable to observe posts list changes.
   *
   * @type {Observable<Array<Post>>}
   */
  posts$: Observable<Array<Post>>;

  isSignedIn = false;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  // ***************************************************************************
  // Static methods
  // ***************************************************************************

  /**
   * Constructor.
   *
   * @constructor
   * @param  {PostService}        _postService singleton instance of the post Service
   * @param  {UserService}        _userService singleton instance of the post Service
   * @return {PostListComponent}  instance of the post list component
   */
  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _router     : Router) {}

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  /**
   * Public interface method to be fired after the component is initialized.
   *
   * @interface OnInit
   */
  ngOnInit() {
    this.posts$ = this._postService.readPosts();

    this._userService.isSignedIn$.subscribe(isSignedIn => {
      this.isSignedIn = isSignedIn;
    });
  }

  /**
   * Method to delete one post by id.
   *
   * @param  {string} postId
   */
  deletePost(postId: string) {
    this._postService.deletePost(postId);
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************
}
