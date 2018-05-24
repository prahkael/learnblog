// *****************************************************************************
// Imports
// *****************************************************************************

import { Component }         from '@angular/core';
import { OnInit }            from '@angular/core';
import { Input }             from '@angular/core';

// *****************************************************************************

import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';

// *****************************************************************************

import { FormControl }          from '@angular/forms';
import { FormGroup }            from '@angular/forms';

// *****************************************************************************

import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { Observable }           from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

// *****************************************************************************

import { PostPublicService } from '../post-public.service';
import { Post }              from '../post';

// *****************************************************************************
// Class
// *****************************************************************************

@Component({
  selector     : 'app-post-view',
  templateUrl  : 'post-view.component.html',
  styleUrls    : ['post-view.component.scss'],
})
export class PostViewComponent implements OnInit {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  isSignedIn      : boolean    = false;
  post            : Post;
  formGroupComment: FormGroup;
  _id             : string;
  posts$          : Observable<any>;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  // ***************************************************************************
  // Constructor
  // ***************************************************************************

  constructor(
    private _postService: PostPublicService,
    private _router     : Router,
    private _activatedRoute: ActivatedRoute) {
      this.formGroupComment = new FormGroup({
        user   : new FormControl(),
        comment: new FormControl(),
        title  : new FormControl(),
      });
    }

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  ngOnInit() {
    this.posts$ = this._postService.getPostsAsObservable();
    this._id    = this._activatedRoute.snapshot.params.id;

    this.posts$.subscribe(posts => {
      if (!posts) { return null; }
      const currPost = posts.find(post => post._id === this._id);
      if (currPost) {
        this.post = currPost;
      }
    });
  }

  // ***************************************************************************

  saveComment() {
    if (this.formGroupComment.invalid) {
      return;
    }

    const commentToSave = {...this.formGroupComment.value};
    this._postService.createComment(this._id, commentToSave);
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************

  // ***************************************************************************
  // ***************************************************************************
}
