import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <header id="tabArea">
        <div id="pageId">1.5a</div>
        <Tabs defaultActiveKey={1} id="controlledTab">
          <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
          <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
        </Tabs>
      </header>
    );
  }
}

export default App;
