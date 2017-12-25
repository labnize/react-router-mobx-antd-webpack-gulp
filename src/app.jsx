import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import item1 from 'pages/item1/item1';
import item2 from 'pages/item2/item2';
import item3 from 'pages/item3/item3';
import item4 from 'pages/item4/item4';
import item5 from 'pages/item5/item5';
import item6 from 'pages/item6/item6';
import item7 from 'pages/item7/item7';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={item1} />
          <Route path="/item1" component={item1} />
          <Route path="/item2" component={item2} />
          <Route path="/item3" component={item3} />
          <Route path="/item4" component={item4} />
          <Route path="/item5" component={item5} />
          <Route path="/item6" component={item6} />
          <Route path="/item7" component={item7} />
        </Switch>
      </div>
    );
  }
}

export default App;
