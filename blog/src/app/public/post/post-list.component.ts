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
  selector     : 'app-post-list',
  templateUrl  : 'post-list.component.html',
  styleUrls    : ['post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  posts$: Observable<any>;
  auth: BehaviorSubject<boolean>;
  isSignedIn = false;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  // ***************************************************************************
  // Constructor
  // ***************************************************************************

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _router     : Router) {}

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  ngOnInit() {
    this.posts$ = this._postService.getPostsAsObservable();
    this._postService.readPosts();

    this._userService.isSignedIn$.subscribe(isSignedIn => {
      this.isSignedIn = isSignedIn;
    });
  }

  // ***************************************************************************

  deletePost(postId: string) {
    const isConfirmed = confirm('Wirklich?');
    if (isConfirmed) {
      this._postService.deletePost(postId);
    }
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************
}
