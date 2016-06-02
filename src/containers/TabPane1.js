import React, {Component} from 'react';
import ImageZoomerTab1 from '../components/ImageZoomer/ImageZoomerTab1.js';
import {connect} from 'react-redux';

class TabPane1Component extends Component {
  render() {
    if (1 === this.props.state.tabKey) {
      return (
        <div id="tabPane1">
          <ImageZoomerTab1 tabKey="tab1" src="http://res.cloudinary.com/www-dharma-treasure-org/image/upload/lijiang/001/001-007a.jpg"/>
          <div id="pbText">
            དེ་ནས་བྲམ་ཟེ་དེས་བྲམ་ཟེའི་ཁྱེའུ་དེ་ལ་འོངས་པ་ལེགས་སོ་ཞེས་བྱ་བའི་ཚིག་གིས་ཀུན་དུwfwefwefwfwe
            དེ་ནས་བྲམ་ཟེ་དེས་བྲམ་ཟེའི་ཁྱེའུ་དེ་ལ་འོངས་པ་ལེགས་སོ་ཞེས་བྱ་བའི་ཚིག་གིས་ཀུན་དུ
          </div>
        </div>
      );
    } else {
      return (
        <div id="tabPane1">
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.comparison
  };
};

const TabPane1 = connect(mapStateToProps)(TabPane1Component);

export default TabPane1;
