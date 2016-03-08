import React from 'react';

import { Observable } from 'rxjs';

import socket from '../helpers/SocketIO';

export default React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired
  },

  setup: function () {
    this.observable = Observable.fromEvent(socket, 'state:change')
      .do((e) => console.log(e))
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
    return (<div></div>);
  }

});
