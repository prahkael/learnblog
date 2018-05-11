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

  post: any;
  formGroup: FormGroup;
  auth: BehaviorSubject<boolean>;
  isEdit: boolean;
  isSignedIn: boolean;

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
   this.post = {};
  }

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  ngOnInit() {
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
      this._postService.readPost(id).subscribe((post: Post) => {
        this.post = post;
        this._activatedRoute.queryParams
        .filter(params => params.state)
        .subscribe(params => {
          if (params && params.state && params.state === 'read') {
            this.isEdit = false;
          }
        });
        return this.formGroup.patchValue(post);
      });
    }
  }

  // ***************************************************************************
  // Private methods
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

  createMock() {
    const mockedBlog = createMockedPost();
    this.formGroup.get('title').setValue(mockedBlog.name);
    this.formGroup.get('body').setValue(mockedBlog.postBody);
    this.post.author = mockedBlog.author;
  }

  // ***************************************************************************
}
