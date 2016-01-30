import React from 'react';

import { Observable, Subject } from 'rxjs';

import { SocketIO } from 'unveil-network-sync/lib';

export default React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired
  },

  componentWillMount: function () {
    this.subject = new Subject();
  },

  componentDidMount: function () {
    Observable.fromEvent(SocketIO, 'state/slide/add:accept')
      .subscribe(this.setRequest);

    this.subject
      .subscribe((media) => SocketIO.emit('state/slide:add', media));
  },

  accept: function () {
    this.subject.next(this.state.request);
    this.resetRequest();
  },

  getInitialState: function () {
    return {request: null};
  },

  resetRequest: function () {
    this.setState({request: null});
  },

  setRequest: function (request) {
    this.setState({request: request});
  },

  render: function () {
    if (!this.state.request) {
      return (<div></div>);
    }

    return (<div className="modal media-acceptor">
      <div className="modal-content">
        <h2>Incoming Request</h2>
        <div className="media-acceptor-request">{this.state.request}</div>
        <div className="modal-buttons">
          <button onClick={this.accept}>Accept</button>
          <button onClick={this.resetRequest}>Go Away!</button>
        </div>
      </div>
    </div>);
  }

});