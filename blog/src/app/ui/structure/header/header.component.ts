// *****************************************************************************
// Imports
// *****************************************************************************

import { Component } from '@angular/core';
import { UserService } from '../../../public/user/user.service';

// *****************************************************************************
// Class
// *****************************************************************************

/**
 * Class of the .
 *
 * @class
 * @author Marco Schaule <marco.schaule@net-designer.net>
 */
@Component({
  selector     : 'ui-header',
  templateUrl  : 'header.component.html',
  styleUrls    : ['header.component.scss'],
})
export class HeaderComponent {
  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  userAuth: boolean;

  // ***************************************************************************
  // Private properties
  // ***************************************************************************

  // ***************************************************************************
  // Static methods
  // ***************************************************************************

  /**
   * Constructor.
   *
   * @constructor
   * @param  {UserService}       _userService singleton instance of the user Service
   * @return {HeaderComponent}                instance of the header component
   */
  constructor(private _userService: UserService) {
    this.userAuth = this._userService.isSignedIn;
  }

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  public changeUserAuth() {
    if (this._userService.isSignedIn) {
      this._userService.signOut();
      this.userAuth = false;
    } else {
      this._userService.signIn();
      this.userAuth = true;
    }
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************

  // ***************************************************************************
  // ***************************************************************************
}
