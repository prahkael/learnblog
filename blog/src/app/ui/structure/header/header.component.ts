// *****************************************************************************
// Imports
// *****************************************************************************

import { Component } from '@angular/core';
import { AuthService } from '../../../public/auth/auth.service';

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
  selector     : 'app-ui-header',
  templateUrl  : 'header.component.html',
  styleUrls    : ['header.component.scss'],
})
export class HeaderComponent {
  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  hasAuth: boolean;

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
   * @param  {AuthService}       _userService singleton instance of the user Service
   * @return {HeaderComponent}                instance of the header component
   */
  constructor(private _authService: AuthService) {
    this.hasAuth = this._authService.isSignedIn;
  }

  // ***************************************************************************
  // Public methods
  // ***************************************************************************

  public changeAuth() {
    if (this._authService.isSignedIn) {
      this._authService.signOut();
      this.hasAuth = false;
    } else {
      this._authService.signIn();
      this.hasAuth = true;
    }
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************

  // ***************************************************************************
  // ***************************************************************************
}
