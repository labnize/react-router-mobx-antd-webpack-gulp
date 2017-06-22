// import React from 'react';
// import ReactDOM from 'react-dom';
// import Layout from 'components/layout/layouttest';

import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }
  handleChange(date) {
    message.info(`您选择的日期是: ${date.toString()}`);
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

