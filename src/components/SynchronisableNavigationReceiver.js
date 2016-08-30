import React from 'react'

import { Observable, Subject } from 'rxjs'
import IFrame from '../../IFrame'
import socket from '../helpers/SocketIO'

export default class SynchronisableNavigationReceiver extends React.Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    routerState: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.toggleSynchronised = this.toggleSynchronised.bind(this)
    this.share = this.share.bind(this)

    this.state = {
      lastState:    [0],
      synchronised: true
    }
  }

  setup () {
    this.observable = Observable.fromEvent(socket, 'state:change')
      .map((e) => ({
        state :        ...e,
        navigatedAway: !this.state.synchronised && true || this.context.routerState.indices.equals(this.state.lastState)
      }))
      .do((e) => {
          this.setState({ synchronised : e.navigatedAway, synchronised: navigatedAway })
      })
      .filter((e) => !e.navigatedAway)
      .pluck('state')
      .subscribe(this.props.navigator.next)
  }

  componentDidMount () {
    this.setup()
  }

  toggleSynchronised (event) {
    this.props.navigator.next(this.state.lastState)
    this.setState({synchronised: !this.state.synchronised})
  }

  render () {
    return (
      <div className="navigation-receiver">
        <button onClick={this.toggleSynchronised}>
          {this.state.synchronised &&
            <i className="fa fa-magnet"></i>
          || (
            <span class="fa-stack">
              <i class="fa fa-magnet fa-stack-1x"></i>
              <i class="fa fa-ban fa-stack-2x"></i>
            </span>
          )}
        </button>
      </div>
    )
  }

}
