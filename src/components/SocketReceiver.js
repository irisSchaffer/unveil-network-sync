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
  },

  render: function () {
    return (<div></div>);
  }

});
