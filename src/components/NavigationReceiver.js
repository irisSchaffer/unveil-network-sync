import React from 'react';

import { Observable } from 'rxjs';

import socket from '../helpers/SocketIO';

export default React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired
  },

  contextTypes: {
    routerState: React.PropTypes.object.isRequired
  },

  setup: function () {
    this.observable = Observable.fromEvent(socket, 'state:change')
      .filter((e) => !this.context.routerState.indices.equals(e))
      .do((e) => console.log('Socket Receiver', e))
      .subscribe(this.props.navigator.next);
  },

  tearDown: function () {
    if (this.observable) {
      this.observable.unsubscribe();
    }
  },

  componentDidMount: function () {
    this.setup();
  },

  componentDidUpdate: function () {
    //this.tearDown();
    //this.setup();
  },

  render: function () {
    return false;
  }

});
