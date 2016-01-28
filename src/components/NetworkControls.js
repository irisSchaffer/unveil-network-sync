import React from 'react';

import { Observable } from 'rxjs';

import socket from '../helpers/SocketIO';

export default React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    Observable.fromEvent(socket, 'state:changed')
      .subscribe(this.props.navigator.next);

    Observable.fromRouter()
      .subscribe((state) => socket.emit('state:changed', state.indices));
  },

  render: function () {
    return (<div></div>);
  }

});
