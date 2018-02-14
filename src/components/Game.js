import React, {Component} from 'react';
import Shake from 'shake.js'
// import p5 from 'p5';

import sketch from './Sketch';
import Results from './Results'
import bubbleSound from '../sounds/bulles.mp3'

// setup
window.setup = () => {
  // document.querySelector('.app__container').appendChild(window.p5.canvas)
  // window.p5.background(0);
}



export default class Game extends Component {
  constructor(props) {
    super()

    this.state = {
      player: {},
      resistance: 0,
      score: 0,
      shakeCount: 0,
      gameIsOn: false,
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
    return audio;
  }

  play() {
    this.setState({
      gameIsOn: true
    })
    this.shake.start();
    window.addEventListener('shake', this.onShake, false);
    window.addEventListener('keydown', this.onShake, false);

    const timeout = setTimeout(() => {
      this.stop()
    }, this.props.timeout);
  }

  stop() {
    console.warn('you score is ' + this.state.score)
    this.shake.stop()
    window.removeEventListener('shake', this.onShake, false);
    window.removeEventListener('keydown', this.onShake, false);

    // window.p5.remove();

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
      score: this.state.score + (100 - (this.state.resistance * 2))
    })
    this.pop()
  }


  shouldComponentUpdate(nextProps, nextState) {
    // return this.state.gameIsOn !== nextState.gameIsOn
    return true
  }

  componentDidMount() {
    // window.p5 = new p5()
    // console.log(document.querySelector('#defaultCanvas0'))
    // document.querySelector('#defaultCanvas0').remove()
  }

  render() {
    return (
    <div>
      {this.state.gameIsOver && <Results score={this.state.score} />}
      {this.state.gameIsOn ?
        <div>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      : <div className="text-center">
          <button className="btn btn-success" onClick={this.play.bind(this)}>Jouer</button>
        </div>
      }
    </div>)
  }
}