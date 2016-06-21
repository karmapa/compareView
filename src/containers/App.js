import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import PageControl from './PageControl.js';
import TabPane1 from './TabPane1';
import TabPane2 from './TabPane2';
import store from '../store/store.js';
import {tabSwitch} from '../reducers/comparison.js';
import {connect} from 'react-redux';

class AppComponent extends Component {
  handleSelect(key) {
    store.dispatch(tabSwitch(key));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextProps.state.tabKey !== this.props.state.tabKey) ||
      (nextProps.state.currentPage1 !== this.props.state.currentPage1)
    );
  }

  render() {
    let t1 = this.props.state.textName1 + ' ' + this.props.state.currentPage1;
    let t2 = this.props.state.textName2 + ' ' + this.props.state.currentPage2;
    return (
      <div id="tabArea">
        <PageControl />
        <Tabs defaultActiveKey={1} id="controlledTab" onSelect={this.handleSelect}>
          <Tab eventKey={1} title={t1} />
          <Tab eventKey={2} title={t2} />
        </Tabs>
        <TabPane1 />
        <TabPane2 />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.comparison
  };
};

const App = connect(mapStateToProps)(AppComponent);

export default App;
