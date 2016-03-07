import { Observable, Subject } from 'rxjs';
import { createNavigator as createBaseNavigator } from '../../../unveil.js/src';
let socket = require('../helpers/SocketIO').default;

let createNavigator = (opts) => {

  let { stateObservable } = opts;

  let baseNavigator = createBaseNavigator({ stateObservable });
  console.log('creating navigator', stateObservable)

  let subject = new Subject();
  let baseSubscription = baseNavigator.asObservable()
    .do((e) => console.log('socket sender', e))
    .subscribe((state) => socket.emit('state:changed', state));

  let socketSubscription = Observable.fromEvent(socket, 'state:changed')
      .do((e) => console.log('socket receiver', e))
      .subscribe((e) => subject.next(e));

  subject.subscribe((e) => console.log('stuff coming in through navigator subject', e))

  let asObservable = () => subject

  console.log(baseNavigator)

  return {
    isPossibleMotion: baseNavigator.isPossibleMotion,
    directions      : baseNavigator.directions,
    motionNames     : baseNavigator.motionNames,
    next            : baseNavigator.next,
    subject,
    asObservable
  };
};

export default createNavigator;
