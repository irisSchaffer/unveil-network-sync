import React from 'react';

import { Observable } from 'rxjs';

import socket from '../helpers/SocketIO';

export default React.createClass({
  componentDidMount: function () {
    Observable.fromRouter()
      .subscribe((state) => socket.emit('state:changed', state.indices));
  },

  render: function () {
    return (<div></div>);
  }

});
