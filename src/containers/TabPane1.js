import React, {Component} from 'react';
import ImageZoomer from './ImageZoomer/ImageZoomer.js';

class TabPane1 extends Component {
  render() {
    return (
      <div id="tabPane1">
        <ImageZoomer src="http://res.cloudinary.com/www-dharma-treasure-org/image/upload/lijiang/001/001-007a.jpg"/>
        <div id="pbText">
          དེ་ནས་བྲམ་ཟེ་དེས་བྲམ་ཟེའི་ཁྱེའུ་དེ་ལ་འོངས་པ་ལེགས་སོ་ཞེས་བྱ་བའི་ཚིག་གིས་ཀུན་དུwfwefwefwfwe
          དེ་ནས་བྲམ་ཟེ་དེས་བྲམ་ཟེའི་ཁྱེའུ་དེ་ལ་འོངས་པ་ལེགས་སོ་ཞེས་བྱ་བའི་ཚིག་གིས་ཀུན་དུ
        </div>
      </div>
    );
  }
}

export default TabPane1;
