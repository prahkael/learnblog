// *****************************************************************************
// Imports
// *****************************************************************************

import { Injectable }           from '@angular/core';

import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { Subject }              from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators';

// *****************************************************************************
// Class
// *****************************************************************************

/**
 * Class of the user service.
 *
 * @class
 * @author Thomas Fuchs <thomas.fuchs@net-designer.net>
 */
@Injectable()
export class UserService {
  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  /**
   * Is signed in
   * @return {Boolean}
   */
  isSignedIn  = false;

  /**
   * Is signed in as Observer
   * @return {BehaviorSubject<boolean>}
   */
  isSignedIn$ = new BehaviorSubject<boolean>(this.isSignedIn);

  // ***************************************************************************
  // Private properties
  // ***************************************************************************
  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  constructor() {}

  /**
   * Method to sign in
   */
  signIn() {
    this.isSignedIn = true;
    this.isSignedIn$.next(this.isSignedIn);
  }

  /**
   * Method to sign out
   */
  signOut() {
    this.isSignedIn = false;
    this.isSignedIn$.next(this.isSignedIn);
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************
}
