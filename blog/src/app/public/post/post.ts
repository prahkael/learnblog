// *****************************************************************************
// Imports
// *****************************************************************************

import { createMockedObjectId } from './post-list.mock';

// *****************************************************************************
// Classes
// *****************************************************************************

export class Post {
  _id?     : string;
  title    : string;
  body     : string;
  author   : string;
  updatedAt: [Date];
  createdAt: Date;

  // ***************************************************************************

  constructor({ _id, title, body, author, createdAt, updatedAt }) {
    this._id       = _id;
    this.title     = title;
    this.body      = body;
    this.author    = author;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
