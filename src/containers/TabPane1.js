import React, {Component} from 'react';
import ImageZoomer from '../components/ImageZoomer/ImageZoomer.js';
import {connect} from 'react-redux';

class TabPane1Component extends Component {
  render() {
    return (
      <div id="tabPane1">
        <ImageZoomer tabKey="1" src="http://res.cloudinary.com/www-dharma-treasure-org/image/upload/lijiang/001/001-007a.jpg"/>
        <div id="pbText">
          དེ་ནས་བྲམ་ཟེ་དེས་བྲམ་ཟེའི་ཁྱེའུ་དེ་ལ་འོངས་པ་ལེགས་སོ་ཞེས་བྱ་བའི་ཚིག་གིས་ཀུན་དུwfwefwefwfwe
          དེ་ནས་བྲམ་ཟེ་དེས་བྲམ་ཟེའི་ཁྱེའུ་དེ་ལ་འོངས་པ་ལེགས་སོ་ཞེས་བྱ་བའི་ཚིག་གིས་ཀུན་དུ
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.comparison
  };
};

const TabPane1 = connect(mapStateToProps)(TabPane1Component);

export default TabPane1;
