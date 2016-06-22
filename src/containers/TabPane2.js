import React, {Component} from 'react';
import ImageZoomerTab2 from '../components/ImageZoomer/ImageZoomerTab2.js';
import {connect} from 'react-redux';

class TabPane2Component extends Component {
  spliceString(str, index, count, add) {
    return str.slice(0, index) + (add || '') + str.slice(index + count);
  }

  setLineBreak(text, comparePos) {
    let markedText = this.spliceString(this.spliceString(text, comparePos[0] + comparePos[1], 0, '^'), comparePos[0], 0, '^');
    let arr = markedText.split('\r\n');
    let output = arr.map((line, idx) => {
      if (line.match('^')) {
        line = line.split('^');
        return <div key={idx}>{line[0]}<span className="bgRed">{line[1]}</span>{line[2]}</div>;
      } else {
        return <div key={idx}>{line}</div>;
      }
    });
    return output;
  }

  render() {
    let text = this.props.state.text2;
    let arr = this.props.state.currentPage2.split('.');
    let currentVolStr = ('00' + arr[0]).substr(arr[0].length - 1, 3);
    let currentPageStr = ('00' + arr[1]).substr(arr[1].length - 2, 4);
    let imgSrc = 'http://res.cloudinary.com/www-dharma-treasure-org/image/upload/'
                  + 'lijiang/' + currentVolStr + '/' + currentVolStr + '-'
                  + currentPageStr + '.jpg';
    if (2 === this.props.state.tabKey) {
      return (
        <div id="tabPane2">
          <ImageZoomerTab2 tabKey="tab2" src={imgSrc}/>
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
