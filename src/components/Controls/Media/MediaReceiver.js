import React from 'react';

import { Observable } from 'rxjs';

import { SocketIO } from 'unveil-network-sync/lib';


export default React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    Observable.fromEvent(SocketIO, 'state/slide:add')
      .map(this.toStateEvent)
      .subscribe(this.props.stateSubject.next);
  },

  toStateEvent: function (content) {
    return {
      type: 'state/slide:add',
      data: {
        props: {},
        children: content
      }
    };
  },

  render: function () {
    return (<div></div>);
  }

});