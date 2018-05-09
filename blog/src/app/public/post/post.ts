// *****************************************************************************
// Imports
// *****************************************************************************

import { createMockedObjectId } from './post-list.mock';

// *****************************************************************************
// Classes
// *****************************************************************************

export class Post {
  _id?  : string;
  title : string;
  body  : string;
  author: string;

  // ***************************************************************************

  constructor({ _id, title, body, author }) {
    this._id    = _id;
    this.title  = title;
    this.body   = body;
    this.author = author;
  }
}
