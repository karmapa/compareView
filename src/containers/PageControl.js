import React, {Component} from 'react';
import store from '../store/store.js';
import {pagePre, pageNext, pageInput, pageKeyPress} from '../reducers/comparison.js';
import {connect} from 'react-redux';

class PageControlComponent extends Component {
  onPagePre() {
    store.dispatch(pagePre());
  }

  onPageNext() {
    store.dispatch(pageNext());
  }

  onPageKeyPress(event) {
    store.dispatch(pageKeyPress(event.key));
  }

  handleChange(event) {
    store.dispatch(pageInput(event.target.value));
  }

  render() {
    return (
      <span>
        <input id="pageInput" className="" value={this.props.state.pageInput} onKeyPress={this.onPageKeyPress} onChange={this.handleChange}></input>
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
