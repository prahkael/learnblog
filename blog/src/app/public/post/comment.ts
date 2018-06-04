// *****************************************************************************
// Imports
// *****************************************************************************

// *****************************************************************************
// Classes
// *****************************************************************************

export class Comment {
  _id?     : string;
  user     : string;
  comment  : string;
  title    : string;
  updatedAt: Date;
  createdAt: Date;

  // ***************************************************************************

  constructor({ _id, user, comment, title, createdAt, updatedAt }) {
    this._id       = _id;
    this.user      = user;
    this.comment   = comment;
    this.title     = title;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
