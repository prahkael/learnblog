// *****************************************************************************
// Imports
// *****************************************************************************

import { Component } from '@angular/core';

// *****************************************************************************
// Class
// *****************************************************************************

/**
 * Class of a "500 server error" component. This component is displayed whenever
 * a link is called that is not registered.
 *
 * @class
 * @author Thomas Fuchs <thomas.fuchs@net-designer.net>
 */
@Component({
  selector: 'post-500',
  template: `
    <div class="well">
      <h1>500 Server Error!</h1>
      <p>There seem to be a server error. Please concat the administrator. Thank you.</p>
    </div>
  `,
})
export class Post500Component {}

// *****************************************************************************
