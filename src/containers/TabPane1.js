import React, {Component} from 'react';
import ImageZoomerTab from '../components/ImageZoomer/ImageZoomerTab.js';
import {connect} from 'react-redux';

class TabPane1Component extends Component {
  setLineBreak(text) {
    let arr = text.split('\r\n');
    let output = arr.map((line, idx) => {
      return <div key={idx}>{line}</div>;
    });
    return output;
  }

  render() {
    let text = this.props.state.text1;
    let arr = this.props.state.currentPage1.split('.');
    let currentVolStr = ('00' + arr[0]).substr(arr[0].length - 1, 3);
    let currentPageStr = ('00' + arr[1]).substr(arr[1].length - 2, 4);
    let imgSrc = 'http://res.cloudinary.com/www-dharma-treasure-org/image/upload/'
                  + 'lijiang/' + currentVolStr + '/' + currentVolStr + '-'
                  + currentPageStr + '.jpg';
    if (1 === this.props.state.tabKey) {
      return (
        <div id="tabPane1">
          <ImageZoomerTab tabKey="tab1" src={imgSrc}/>
          <div id="pbText">
            {this.setLineBreak(text)}
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
