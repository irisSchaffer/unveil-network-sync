import React from 'react';

import { Observable } from 'rxjs';

import Media from '../../Media';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;


export default React.createClass({
  propTypes: {
    stateSubject: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    Observable.fromEvent(socket, 'state/slide:add')
      .map(this.toStateEvent)
      .distinctUntilChanged()
      .subscribe((e) => this.props.stateSubject.next(e));
  },

  toStateEvent: function (data) {
    return {
      type: 'state/slide:add',
      data: React.createElement(Media, {data: data})
    };
  },

  render: function () {
    return false;
  }

});