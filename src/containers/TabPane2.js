import React, {Component} from 'react';
import ImageZoomer from './ImageZoomer/ImageZoomer.js';

class TabPane2 extends Component {
  render() {
    return (
      <div id="tabPane2">
        <div className="pageImg">
          <ImageZoomer src="http://res.cloudinary.com/www-dharma-treasure-org/image/upload/lijiang/001/001-005a.jpg"/>
        </div>
      </div>
    );
  }
}

export default TabPane2;
