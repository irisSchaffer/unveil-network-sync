import React from 'react'

import { Observable } from 'rxjs'

import socket from '../helpers/SocketIO'

export default class NavigationSender extends React.Component {

  setup () {
    this.setState({lastStateChange: []})
    this.routerObservable = Observable.fromRouter().pluck('indices')

    this.routerObservable
      .filter((indices) => !indices.equals(this.state.lastStateChange))
      .do((e) => console.log('socket sender succeeded', e))
      .subscribe((indices) => socket.emit('state:change', indices))

    this.routerObservable
      .filter((indices) => indices.equals(this.state.lastStateChange))
      .do((e) => console.log('socket sender failed', this.state))
      .subscribe(() => this.setState({lastStateChange: []}))

    this.socketObservable = Observable.fromEvent(socket, 'state:change')
      .do((e) => console.log('socket sender saving last state change', e))
      .subscribe((e) => this.setState({lastStateChange: e}))
  }

  tearDown () {
    if (this.routerObservable) {
      this.routerObservable.unsubscribe()
    }

    if (this.socketObservable) {
      this.socketObservable.unsubscribe()
    }
  }

  componentDidMount () {
    this.setup()
  }

  componentWillUnmount () {
    this.tearDown()
    this.setup()
  }

  render () {
    return false
  }

}
