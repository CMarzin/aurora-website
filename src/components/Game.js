import React, {Component} from 'react';
import Shake from 'shake.js'
import p5 from 'p5';

import { setup, draw, setBubbles, windowResized} from './Sketch';
import Results from './Results'
import bubbleSound from '../sounds/bulles.mp3'

let visual = new p5()


// P5
window.setup = setup
window.draw = draw
window.windowResized = windowResized

export default class Game extends Component {
  constructor(props) {
    super()

    this.state = {
      player: "",
      resistance: 0,
      score: 0,
      shakeCount: 0,
      gameIsOn: false,
      timeLeft: props.timeout,
      timePassed: 0,
      gameIsOver: false,
    }
    this.props = props

    this.shake = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 10 // optional, determines the frequency of event generation
    });
    this.onShake = this.shakeEvent.bind(this)
  }

  pop() {
    const audio = new Audio();
    audio.addEventListener('canplaythrough', audio.play, false);
    audio.src = bubbleSound;

    try {navigator.vibrate(500)} catch (e) {}

    return audio;
  }

  play() {
    this.setState({
      gameIsOn: true
    })

    this.shake.start();
    window.addEventListener('shake', this.onShake, false);
    window.addEventListener('keydown', this.onShake, false);

    const timerInterval = 10
    this.timer = setInterval(() => {
      this.setState({
        timeLeft: this.props.timeout - this.state.timePassed,
        timePassed: this.state.timePassed + timerInterval,
      })
    }, timerInterval)


    window.setup(true)
    visual.loop()

    this.setState({
      score: 0,
      resistance: 0,
      score: 0,
      shakeCount: 0,
      timeLeft: this.props.timeout,
      timePassed: 0,
    })


    const timeout = setTimeout(() => {
      this.stop()
    }, this.props.timeout);
  }

  stop() {
    this.shake.stop()
    window.removeEventListener('shake', this.onShake, false);
    window.removeEventListener('keydown', this.onShake, false);

    clearInterval(this.timer)
    visual.noLoop();
    visual.noCanvas()
    setBubbles()

    this.setState({
      gameIsOn: false,
      gameIsOver: true,
    })
  }

  shakeEvent(e) {
    e && e.preventDefault();

    this.setState({
      shakeCount: this.state.shakeCount + 1,
      resistance: this.state.resistance + 1,
      score: this.state.score + 2
    })
    setBubbles(this.state.score)
    this.pop()
  }

  setPlayer(event) {
    const data = window.$(event.target).serializeArray()[0]
    this.setState({ player: data.value })    
  }

  render() {
    return (
    <div className="text-center">
      { (this.state.gameIsOver && !this.state.gameIsOn) &&
        <Results
          onSubmit={this.setPlayer.bind(this)}
          score={this.state.score}
          player={this.state.player}
          />}
        <pre>{false && JSON.stringify(this.state, null, 2)}</pre>

      {this.state.gameIsOn ?
        <div>
            <p className="time">{(this.state.timeLeft / 1000).toFixed(2)}</p>
        </div>
      : <div className="text-center">
          <button className="btn btn-success" onClick={this.play.bind(this)}>Jouer</button>
        </div>
      }
    </div>)
  }
}