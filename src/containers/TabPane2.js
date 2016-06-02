import React, {Component} from 'react';
import ImageZoomer from './ImageZoomer/ImageZoomer.js';
import {connect} from 'react-redux';

class TabPane2Component extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.state.tabKey ,this.props.state.tabKey);
    return (nextProps.state.tabKey !== this.props.state.tabKey);
  }

  render() {
    return (
      <div id="tabPane2">
        <ImageZoomer src="http://res.cloudinary.com/www-dharma-treasure-org/image/upload/lijiang/001/001-005a.jpg"/>
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

const TabPane2 = connect(mapStateToProps)(TabPane2Component);

export default TabPane2;
