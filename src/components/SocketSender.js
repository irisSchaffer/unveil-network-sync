import React from 'react';

import { Observable } from 'rxjs';

import socket from '../helpers/SocketIO';

export default React.createClass({

  setup: function () {
    this.observable = Observable.fromRouter()
      .subscribe((state) => socket.emit('state:change', state.indices));
  },

  tearDown: function () {
    if (this.observable) {
      this.observable.unsubscribe();
    }
  },

  componentDidMount: function () {
    this.setup();
  },

  componentWillReceiveProps: function () {
    //this.tearDown();
    //this.setup();
  },

  render: function () {
    return false;
  }

});
