// *****************************************************************************
// Imports
// *****************************************************************************

import { Component }         from '@angular/core';
import { OnInit }            from '@angular/core';

// *****************************************************************************

import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';

// *****************************************************************************

import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { Observable }        from 'rxjs/Observable';

// *****************************************************************************

import { PostAdminService }  from '../post-admin.service';
import { AuthService }       from '../../../public/auth/auth.service';
import { Post }              from '../../../public/post/post';

// *****************************************************************************
// Class
// *****************************************************************************

@Component({
  selector     : 'app-post-table-list',
  templateUrl  : 'post-table-list.component.html',
  styleUrls    : ['post-table-list.component.scss'],
})
export class PostTableListComponent implements OnInit {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  isSignedIn   : boolean = false;
  sortKey      : string  = 'updatedAt';
  posts$       : Observable<any>;
  auth         : BehaviorSubject<boolean>;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  // ***************************************************************************
  // Constructor
  // ***************************************************************************

  constructor(
    private _postService: PostAdminService,
    private _authService: AuthService,
    private _router     : Router
  ) {}

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  ngOnInit() {
    this.posts$ = this._postService.getPostsAsObservable();

    this._authService.isSignedIn$.subscribe(isSignedIn => {
      this.isSignedIn = isSignedIn;
    });
  }

  // ***************************************************************************

  sort(sortKey: string) {
    const minusKey = '-' + sortKey;
    this.sortKey   = this.sortKey === sortKey ? minusKey : sortKey;
    this._postService.readPosts(this.sortKey);
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
  // ***************************************************************************
  // ***************************************************************************
}
