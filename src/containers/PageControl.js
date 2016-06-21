import React, {Component} from 'react';
import store from '../store/store.js';
import {pagePre, pageNext} from '../reducers/comparison.js';
import {connect} from 'react-redux';

class PageControlComponent extends Component {
  onPagePre() {
    store.dispatch(pagePre());
  }

  onPageNext() {
    store.dispatch(pageNext());
  }

  render() {
    return (
      <span>
        <button id="pagePre" onClick={this.onPagePre}></button>
        <button id="pageNext" onClick={this.onPageNext}></button>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.comparison
  };
};

const PageControl = connect(mapStateToProps)(PageControlComponent);

export default PageControl;
