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
    let arr = this.props.state.currentPage1.split('-');
    let currentVolStr = arr[0] + '-' + arr[1];
    let currentPageStr = this.props.state.currentPage1;
    let imgSrc = 'https://s3-ap-southeast-1.amazonaws.com/files.dharma-treasure.org/'
                  + 'jiangkangyur/jiangkangyur' + currentVolStr + '/' + currentPageStr + '.jpg';
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
