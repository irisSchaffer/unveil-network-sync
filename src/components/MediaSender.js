import React from 'react';

import { Observable, Subject } from 'rxjs';

import socket from 'unveil-network-sync';

export default React.createClass({
  componentWillMount: function() {
    this.subject = new Subject();
  },

  componentDidMount: function () {
    subject
      .subscribe((content) => {
        socket.emit('state/slide:add', content);
      });
  },

  share: function () {
    this.subject.next(this.refs.textarea.value);
  },

  toggleSharingMode: function (event) {
    this.setState({sharingMode: true});
  },

  render: function () {
    if (!this.state.sharingMode) return (
      <div><button onClick="{this.toggleSharingMode}">Share</button></div>
    );
    else return (
      <div>
        <textarea ref="textarea" />
        <button onClick="{this.share}">Share</button>
        <button onClick="{this.toggleSharingMode}">Close</button>
      </div>
    );
  }

});