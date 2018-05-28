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

import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

// *****************************************************************************

import { FormControl }       from '@angular/forms';
import { FormGroup }         from '@angular/forms';

// *****************************************************************************

import { PostAdminService }  from '../post-admin.service';
import { AuthService }       from '../../../public/auth/auth.service';
import { Post }              from '../../../public/post/post';

// *****************************************************************************

import { createMockedPost }  from '../post-list.mock';

// *****************************************************************************
// Class
// *****************************************************************************

@Component({
  selector     : 'app-post-manage',
  templateUrl  : 'post-manage.component.html',
  styleUrls    : ['post-manage.component.scss'],
})
export class PostManageComponent implements OnInit {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  post     : any;
  formGroup: FormGroup;
  isEdit   : boolean;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  // ***************************************************************************
  // Static methods
  // ***************************************************************************

  constructor(
      private _postService   : PostAdminService,
      private _authService   : AuthService,
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
    this._authService.isSignedIn$.subscribe(isSignedIn => {
      if (!isSignedIn) {
        this._router.navigate(['posts']);
      }
    });

    const id = this._activatedRoute.snapshot.params.id;
    if (id === 'new') {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      this._postService.readPost(id).subscribe(post => {
        if (!post) {
          this._router.navigate(['posts']);
        }
        this.post = post;
        this.formGroup.get('title').setValue(post.title);
        this.formGroup.get('body').setValue(post.body);
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
    this._router.navigate(['/admin/posts']);
  }

  // ***************************************************************************

  createMock() {
    const mockedBlog = createMockedPost();
    this.formGroup.get('title').setValue(mockedBlog.name);
    this.formGroup.get('body').setValue(mockedBlog.postBody);
    this.post.author = mockedBlog.author;
  }

// ***************************************************************************

  // ***************************************************************************
  // Private methods
  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************
}
