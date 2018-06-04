// *****************************************************************************
// Imports
// *****************************************************************************

import { Component }         from '@angular/core';
import { Input }             from '@angular/core';
import { OnInit }            from '@angular/core';

// *****************************************************************************

import { PostAdminService }  from '../../post/post-admin.service';
import { AuthService }       from '../../../public/auth/auth.service';
import { Post }              from '../../../public/post/post';
import { Comment }           from '../../../public/post/comment';

// *****************************************************************************

import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { Observable }        from 'rxjs/Observable';

// *****************************************************************************

import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';

// *****************************************************************************
// Class
// *****************************************************************************

@Component({
  selector     : 'app-comment-table-list',
  templateUrl  : 'comment-table-list.component.html',
  styleUrls    : ['comment-table-list.component.scss'],
})
export class CommentTableListComponent implements OnInit {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  comments$    : Observable<any>;
  sortKey      : string  = 'updatedAt';

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
    this.comments$ = this._postService.getCommentsAsObservable();

    this._authService.isSignedIn$.subscribe(isSignedIn => {
      if (!isSignedIn) {
        this._router.navigate(['posts']);
      }
    });
  }

  // ***************************************************************************

  deleteComment(commentId: string) {
    const isConfirmed = confirm('Wirklich?');
    if (isConfirmed) {
      this._postService.deleteComment(commentId);
    }
  }

  // ***************************************************************************

  sort(sortKey: string) {
    const minusKey = '-' + sortKey;
    this.sortKey   = this.sortKey === sortKey ? minusKey : sortKey;
    this._postService.readComments(this.sortKey);
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************
}
