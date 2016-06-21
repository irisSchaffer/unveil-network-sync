import React from 'react'

import { Observable } from 'rxjs'

import socket from '../helpers/SocketIO'

export default class NavigationReceiver extends React.Component {
  static contextTypes = {
    navigator:   React.PropTypes.object.isRequired,
    routerState: React.PropTypes.object.isRequired
  };

  setup () {
    this.observable = Observable.fromEvent(socket, 'state:change')
      .filter((e) => !this.context.routerState.indices.equals(e))
      .do((e) => console.log('Socket Receiver', e))
      .subscribe(this.props.navigator.next)
  }

  tearDown () {
    if (this.observable) {
      this.observable.unsubscribe()
    }
  }

  componentDidMount () {
    this.setup()
  }

  componentWillUnmount () {
    this.tearDown()
  }

  render () {
    return false
  }
}
