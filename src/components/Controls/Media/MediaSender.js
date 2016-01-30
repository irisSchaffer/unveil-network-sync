import React from 'react';

import { Observable, Subject } from 'rxjs';

import { SocketIO } from 'unveil-network-sync/lib';

export default React.createClass({
  componentWillMount: function () {
    this.subject = new Subject();
  },

  getInitialState: function () {
    return {sharingMode: false};
  },

  componentDidMount: function () {
    this.subject
      .subscribe((content) => {
        SocketIO.emit('state/slide/add:accept', content);
      });
  },

  share: function () {
    this.subject.next(this.refs.textarea.value);
    this.refs.textarea.value = '';
    this.toggleSharingMode();
  },

  toggleSharingMode: function (event) {
    this.setState({sharingMode: !this.state.sharingMode});
  },

  render: function () {
    if (!this.state.sharingMode) return (
      <div className="media-sender"><button onClick={this.toggleSharingMode}>Share</button></div>
    );
    else return (
      <div className="modal media-sender">
        <div className="modal-content">
          <h2>Share</h2>
          <textarea ref="textarea" className="media-sender-textarea" />
          <div className="modal-buttons">
            <button onClick={this.share}>Share</button>
            <button onClick={this.toggleSharingMode}>Close</button>
          </div>
        </div>
      </div>
    );
  }

});