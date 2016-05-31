import React, {Component} from 'react';
import ImageZoomer from './ImageZoomer/ImageZoomer.js';

class TabPane1 extends Component {
  render() {
    return (
      <div id="tabPane1">
        <ImageZoomer src="http://res.cloudinary.com/www-dharma-treasure-org/image/upload/lijiang/001/001-007a.jpg"/>
      </div>
    );
  }
}

export default TabPane1;
