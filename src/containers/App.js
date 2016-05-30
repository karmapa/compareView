import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import TabPane1 from './TabPane1';
import TabPane2 from './TabPane2';

class App extends Component {
  render() {
    let t1 = 'lj-1.7a';
    let t2 = 'dg-1.5a';
    return (
      <header id="tabArea">
        <Tabs defaultActiveKey={1} id="controlledTab">
          <Tab eventKey={1} title={t1}><TabPane1 /></Tab>
          <Tab eventKey={2} title={t2}><TabPane2 /></Tab>
        </Tabs>
      </header>
    );
  }
}

export default App;
