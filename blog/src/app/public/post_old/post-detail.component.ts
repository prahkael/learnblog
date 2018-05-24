// *****************************************************************************
// Imports
// *****************************************************************************

import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { Input }                from '@angular/core';

import { ActivatedRoute }       from '@angular/router';
import { Router }               from '@angular/router';

import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { Observable }           from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { FormControl }          from '@angular/forms';
import { FormGroup }            from '@angular/forms';

import { UserService }          from '../user/user.service';
import { createMockedObjectId } from './post-list.mock';
import { createMockedPost }     from './post-list.mock';
import { PostService }          from './post.service';
import { Post }                 from './post';

// *****************************************************************************
// Class
// *****************************************************************************

@Component({
  selector     : 'app-post-detail',
  templateUrl  : 'post-detail.component.html',
  styleUrls    : ['post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  posts$          : Observable<any>;
  post            : any;
  formGroup       : FormGroup;
  formGroupComment: FormGroup;
  auth            : BehaviorSubject<boolean>;
  isEdit          : boolean;
  isSignedIn      : boolean;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  private _id: string;

  // ***************************************************************************
  // Static methods
  // ***************************************************************************

  constructor(
      private _postService   : PostService,
      private _userService   : UserService,
      private _router        : Router,
      private _activatedRoute: ActivatedRoute,
  ) {
   this.formGroup = new FormGroup({
     title: new FormControl(),
     body : new FormControl()
   });
   this.formGroupComment = new FormGroup({
     user   : new FormControl(),
     comment: new FormControl(),
     title  : new FormControl(),
   });
   this.post = {};
  }

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  ngOnInit() {
    this.posts$ = this._postService.getPostsAsObservable();
    const id    = this._activatedRoute.snapshot.params.id;
    const state = this._activatedRoute.snapshot.queryParams.state;
    this.isEdit = false;

    this._userService.isSignedIn$.subscribe(isSignedIn => {
      this.isSignedIn = isSignedIn;

      if ((this.isEdit || state === 'new') && !isSignedIn) {
        this._router.navigate(['posts']);
      }
    });

    if (id && state !== 'new') {
      this.isEdit = true;
      this._id    = id;
      this.posts$.subscribe(posts => {
        if (!posts) {
          return null;
        }

        const currPost = posts.find(post => post._id === this._id);
        if (currPost) {
          this.post = currPost;
          return this.formGroup.patchValue(this.post);
        }
      });
      this._activatedRoute.queryParams
          .filter(params => params.state)
          .subscribe(params => {
            if (params && params.state && params.state === 'read') {
              this.isEdit = false;
            }
      });
    }
  }

  // ***************************************************************************

  save() {
    if (this.formGroup.invalid) {
      return;
    }

    const postToSave = { ...this.post, ...this.formGroup.value };
    const methodName = this.isEdit ? 'updatePost' : 'createPost';
    this._postService[methodName](postToSave);
    this._router.navigate(['posts']);
  }

  // ***************************************************************************

  saveComment() {
    if (this.formGroup.invalid) {
      return;
    }

    const commentToSave = {...this.formGroupComment.value};

    this._postService.createComment(this._id, commentToSave);
  }

  // ***************************************************************************

  createMock() {
    const mockedBlog = createMockedPost();
    this.post.author = mockedBlog.author;
    this.formGroup.get('title').setValue(mockedBlog.name);
    this.formGroup.get('body').setValue(mockedBlog.postBody);
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************

  // ***************************************************************************
}
