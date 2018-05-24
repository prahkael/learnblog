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

import { PostPublicService } from '../post-public.service';
import { AuthService }       from '../../auth/auth.service';
import { Post }              from '../post';

// *****************************************************************************
// Class
// *****************************************************************************

@Component({
  selector     : 'app-post-list',
  templateUrl  : 'post-list.component.html',
  styleUrls    : ['post-list.component.scss'],
})
export class PostListComponent implements OnInit {

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
    private _postService: PostPublicService,
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
  // Private methods
  // ***************************************************************************

  // ***************************************************************************
  // ***************************************************************************
}
