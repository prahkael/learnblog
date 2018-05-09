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

/**
 * Class of the .
 *
 * @class
 * @author Thomas Fuchs <thomas.fuchs@net-designer.net>
 */
@Component({
  selector     : 'post-detail',
  templateUrl  : 'post-detail.component.html',
  styleUrls    : ['post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  /**
   * the post object
   * @return {Post}
   */
  post: Post;

  /**
   * Service to check if user is logged in
   * @type {BehaviorSubject<boolean>}
   */
  auth: BehaviorSubject<boolean>;

  /**
   *
   * @type {FormGroup}
   */
  forms: FormGroup;

  /**
   * The state of calling (edit, read, new)
   * @type {string}
   */
  state: string;

  /**
   *
   * @type {Boolean}
   */
  isRead: boolean;

  /**
   *
   * @type {Boolean}
   */
  isEdit: boolean;

  /**
   *
   * @type {Boolean}
   */
  isNew : boolean;

  /**
   * Check if user is logged in
   * @type {Boolean}
   */
  isSignedIn: boolean;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  /**
   * the id of the post
   * @return {string}
   */
  private _id: string;

  // ***************************************************************************
  // Static methods
  // ***************************************************************************

  /**
   * Component's constructor method.
   *
   * @constructor
   * @param  {PostService}          _postService    injected post service
   * @param  {UserService}          _userService    injected post service
   * @param  {Router}               _router         injected router
   * @param  {ActivatedRoute}       _activatedRoute injected activated route
   * @return {PostDetailComponent}                  post detail component instance
   */
  constructor(
      private _postService   : PostService,
      private _userService   : UserService,
      private _router        : Router,
      private _activatedRoute: ActivatedRoute,
  ) {
    this.isNew      = false;
    this.isRead     = false;
    this.isEdit     = false;
    this.isSignedIn = false;
  }

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  /**
   * Public interface method to be fired after the component is initialized.
   *
   * @interface OnInit
   */
   ngOnInit() {
     /*
      * check if user logged in or not
      */
     this._userService.isSignedIn$.subscribe(isSignedIn => {
       this.isSignedIn = isSignedIn;
     });

     /*
      * check if edit or not.
      */
     this._activatedRoute.queryParams
      .filter(params => params.state)
      .subscribe(params => {
        if (!this._setState(params.state)) {
          this._router.navigate(['posts']);
        }
      });

      this._checkAdminRights();

      this.forms = new FormGroup({
        title: new FormControl(),
        body : new FormControl()
      });

      if (this.isEdit || this.isRead) {
        this._activatedRoute.params.subscribe(paramsId => {
          this._id  = paramsId.id;
        });
        this._postService.readPost(this._id).subscribe(res => {
          this.post = res.blog && res.blog[0] || new Post();
          if (this.post) {
            this.forms.get('title').setValue(this.post.title);
            this.forms.get('body').setValue(this.post.body);
          } else {
            this._router.navigate(['posts', 'new']);
          }
        });
      }

      if (this.isNew) {
        this.post = new Post({
          _id   : '',
          title : '',
          body  : '',
          author: ''
        });
        this.post._id    = this._id;
        this.post.author = 'It`s meeeeee';
      }
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************

  /**
   * check if the user has Admin rights. If not, redirect to list.
   */
  private _checkAdminRights() {
    // console.log(`>>> debug: (this.isNew || this.isEdit) && !this.isSignedIn: `, (this.isNew || this.isEdit) && !this.isSignedIn);
    if ((this.isNew || this.isEdit) && !this.isSignedIn) {
      this._router.navigate(['posts']);
    }
  }

  // ***************************************************************************

  /**
   * Set the state.
   * @param  {string} state
   * @return {boolean}
   */
  private _setState(state: string) {
    let stateIsValid = true;

    if (state === 'new') {
      this.isNew = true;
    } else
    if (state === 'edit') {
      this.isEdit = true;
    } else
    if (state === 'read') {
      this.isRead = true;
    } else {
      stateIsValid = false;
    }

    return stateIsValid;
  }

  /**
   * Method to save an existing or create a new post.
   */
  save() {
    const post = this.post;
    post.title = this.forms.get('title').value;
    post.body = this.forms.get('body').value;

    if (this.isEdit) {
      post.author = this.post.author;
      this._postService.updatePost(post);
    } else
    if (this.isNew) {
      this._postService.createPost(post);
    }

    this._router.navigate(['posts']);
  }

  /**
   * Create Mocked entries
   * Called through click
   */
  createMock() {
    const mockedBlog = createMockedPost();
    this.forms.get('title').setValue(mockedBlog.name);
    this.forms.get('body').setValue(mockedBlog.postBody);
    this.post.author = mockedBlog.author;
  }

  // ***************************************************************************
  // ***************************************************************************
}
