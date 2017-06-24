import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import item1List1 from 'pages/item1/sublist1';
import item1List2 from 'pages/item1/sublist2';
import item2List1 from 'pages/item2/sublist1';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

const routers = (
  <Router history={browserHistory}>
    <Route exact path="/" component={App}>
      <IndexRoute component={item1List1} />
      <Route exact path="item1" component={item1List1} />
      <Route exact path="item1/item1SubList1" component={item1List1} />
      <Route exact path="item1/item1SubList2" component={item1List2} />
      <Route exact path="item2" component={item2List1} />
      <Route exact path="item2/item2SubList1" component={item2List1} />
    </Route>
  </Router>
);

ReactDOM.render(routers, document.getElementById('app'));
