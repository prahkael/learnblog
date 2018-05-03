// *****************************************************************************
// Imports
// *****************************************************************************

import { createMockedObjectId } from './post-list.mock';

// *****************************************************************************
// Interfaces
// *****************************************************************************

/**
 * Class of a basic version of the post.
 *
 * @type {Post}
 */
export interface IPost {
  _id?    : string;
  name    : string;
  postBody: string;
  author  : string;
}

// *****************************************************************************
// Classes
// *****************************************************************************

/**
 * Class of the post model.
 *
 * @type {Post}
 */
export class Post implements IPost {
  _id     : string;
  name    : string;
  postBody: string;
  author  : string;

  // ***************************************************************************

  constructor(post: IPost) {
    if (post._id) {
      this._id = post._id;
    } else {
      this._id = createMockedObjectId();
    }
    this.name     = post.name;
    this.postBody = post.postBody;
    this.author   = post.author;
  }
}
