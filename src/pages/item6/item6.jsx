import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import ReconnectingWebSocket from 'reconnectingwebsocket';

const url = 'ws://10.47.73.41:31020/';

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.socketOpen = this.socketOpen.bind(this);
    this.socketError = this.socketError.bind(this);
  }
  componentDidMount() {
    this.socketHandle();
  }
  componentWillUnmount() {
    if (this.socket !== null) {
      this.socket.close();
      this.socket = null;
    }
  }
  socketHandle() {
    this.socket = new ReconnectingWebSocket(url, null, {
      debug: true,
      reconnectInterval: 3000
    });
    this.socket.onopen = this.socketOpen;
    this.socket.onerror = this.socketError;
    this.socket.onmessage = this.socketMessage;
  }

  socketOpen(event) {
    alert('WebSocket connected.');
    alert('send hello to server');
    this.socket.send(JSON.stringify('hello'));
  }

  socketMessage(event) {
    console.log(event);
    console.log(event.data);
  }
  socketError(error) {
    alert('CONNECTION ERROR!');
    this.socket = null;
  }
  render() {
    return (
      <Layout name="item6">
        <div id="reSocket" />
      </Layout>
    );
  }
}

export default PageComponent;
