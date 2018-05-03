// *****************************************************************************
// Imports
// *****************************************************************************

import { Component }      from '@angular/core';

import { ActivatedRoute } from '@angular/router';

// *****************************************************************************
// Class
// *****************************************************************************

/**
 * Class of a "404 not found" component. This component is displayed whenever
 * a link is called that is not registered.
 *
 * @class
 * @author Thomas Fuchs <thomas.fuchs@net-designer.net>
 */
@Component({
  selector: 'post-404',
  template: `
    <div class="well">
      <h1>404 Not found dump ass!</h1>
      <p>The requested page could not be found.</p>
      <p>Current route: {{ currentRoute }}</p>
    </div>
  `,
})
export class Post404Component {

  // ***************************************************************************
  // Public properties
  // ***************************************************************************

  currentRoute: string;

  // ***************************************************************************
  // Static methods
  // ***************************************************************************

  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.url.subscribe(url =>
      this.currentRoute = '/' + url.join('/'));
  }

  // ***************************************************************************
}

// *****************************************************************************
