import React, {Component} from 'react';
import ImageZoomerTab from '../components/ImageZoomer/ImageZoomerTab.js';
import {connect} from 'react-redux';

@connect(state => ({}))
class TabPane2Component extends Component {
  spliceString(str, index, count, add) {
    return str.slice(0, index) + (add || '') + str.slice(index + count);
  }

  setLineBreak(text, comparePos) {
    let markedText = this.spliceString(this.spliceString(text, comparePos[0] + comparePos[1], 0, '^'), comparePos[0], 0, '^');
    let arr = markedText.split(/\n/);
    let output = arr.map((line, idx) => {
      if (line.match('^')) {
        line = line.split('^');
        return <div key={idx}>{line[0]}<span className="matchHighLight">{line[1]}</span>{line[2]}</div>;
      } else {
        return <div key={idx}>{line}</div>;
      }
    });
    return output;
  }

  render() {
    let text = this.props.state.text2;
    let arr = this.props.state.currentPage1.split('-');
    let currentVolStr = arr[0] + '-' + arr[1];
    let currentPageStr = this.props.state.currentPage1;
    let imgSrc = 'https://s3-ap-southeast-1.amazonaws.com/files.dharma-treasure.org/'
                  + 'degekangyur/degekangyur' + currentVolStr + '/' + currentPageStr + '.jpg';
    if (2 === this.props.state.tabKey) {
      return (
        <div id="tabPane2">
          <ImageZoomerTab tabKey="tab2" src={imgSrc} />
          <div id="pbText">
            {this.setLineBreak(text, this.props.state.comparePos)}
          </div>
        </div>
      );
    } else {
      return (
        <div id="tabPane2">
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

const TabPane2 = connect(mapStateToProps)(TabPane2Component);

export default TabPane2;
