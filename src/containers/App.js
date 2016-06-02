import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
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
    return (nextProps.state.tabKey !== this.props.state.tabKey);
  }

  render() {
    let t1 = 'lj-1.7a';
    let t2 = 'dg-1.5a';
    return (
      <header id="tabArea">
        <Tabs defaultActiveKey={1} id="controlledTab" onSelect={this.handleSelect}>
          <Tab eventKey={1} title={t1} />
          <Tab eventKey={2} title={t2} />
        </Tabs>
        <TabPane1 />
        <TabPane2 />
      </header>
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
