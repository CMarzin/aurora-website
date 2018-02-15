import React, {Component} from 'react';
import Shake from 'shake.js'
import p5 from 'p5';

import { setup, draw, setBubbles, windowResized, clearBubbles} from './Sketch';
import Results from './Results'
import bubbleSound from '../sounds/bulles.mp3'

let visual = new p5()

// P5
window.setup = setup
window.draw = draw
window.windowResized = windowResized

const endDate = new Date("February 16, 2018 12:00:00");

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
    this.shake.start();
    window.addEventListener('shake', this.onShake, false);
    window.addEventListener('keyup', this.onShake, false);

    const timerInterval = 25
    this.timer = setInterval(() => {
      this.setState({
        timeLeft: this.props.timeout - this.state.timePassed,
        timePassed: this.state.timePassed + timerInterval,
      })
    }, timerInterval)

    this.resistance = setInterval(() => {
      this.setState({
        score: Math.max(0, Math.round(this.state.score - (this.state.resistance / 8)))
      }, setBubbles(-this.state.resistance / 4))
    }, 1000)

    window.setup(true)
    visual.loop()

    this.setState({
      score: 0,
      resistance: 0,
      score: 0,
      shakeCount: 0,
      timeLeft: this.props.timeout,
      timePassed: 0,
      gameIsOn: true,
    })


    this.timeout = setTimeout(() => {
      this.stop()
    }, this.props.timeout);
  }

  stop() {
    this.shake.stop()
    window.removeEventListener('shake', this.onShake, false);
    window.removeEventListener('keyup', this.onShake, false);
    clearTimeout(this.timeout)
    clearInterval(this.timer)
    clearInterval(this.resistance)
    visual.noLoop();
    document.querySelector('canvas') && visual.noCanvas()
    clearBubbles()

    this.setState({
      gameIsOn: false,
      gameIsOver: true,
    })
  }

  shakeEvent(e) {
    e && e.preventDefault();
    if (e.keyCode && e.keyCode !== 32) return false

    this.setState({
      shakeCount: this.state.shakeCount + 1,
      resistance: this.state.resistance + 1,
      score: this.state.score + 2
    })
    setBubbles(this.state.score)
    this.pop()
  }

  ajaxThis() {
    const $ = window.$;
    $.ajax({
      type: "POST",
      url: 'https://get-letter-api.herokuapp.com/authenticate',
      data: {
        "email": "example@gmail.com",
        "password": "heticp2019",
      },
      success: (auth) => {
        request2(auth.auth_token)
      },
    });

    const request2 = token => $.ajax({
      type: "POST",
      url: "https://get-letter-api.herokuapp.com/bubble_games",
      headers: {
        "Authorization": token,
      },
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        "bubble_game": {
          "pseudo": this.state.player,
          "score": parseInt(this.state.score)
        }
      }),
      complete: post => {
        request3(token)
      }
    })

    const request3 = token => $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "https://get-letter-api.herokuapp.com/bubble_games",
      headers: {
        "Authorization": token
      },
      success: results => {
        console.log(results)
      }
    })
  }

  setPlayer(event) {
    const data = window.$(event.target).serializeArray()[0]
    this.setState({ player: data.value })

    this.ajaxThis()
  }

  componentWillUnmount() {
    this.stop()
  }

  render() {
    if(Date.now() > endDate.getTime())
      return (
        <div>
          <h2 className="text-center mb-3 mt-3">Le jeu est maintenant terminé !</h2>
          <Results
            player={" "}
          />
        </div>
      )
    return (
    <div className={`text-center mb-5 ${(!this.state.gameIsOn && !this.state.gameIsOver) && 'h-75 d-flex justify-content-center align-items-center'}`}>
      {(this.state.gameIsOver && !this.state.gameIsOn) &&
        <Results
          onSubmit={this.setPlayer.bind(this)}
          score={this.state.score}
          player={this.state.player}
          />}
        <pre>{false && JSON.stringify(this.state, null, 2)}</pre>

      {this.state.gameIsOn ?
        <div className="gameIsOn">
            <h2 className="time"><strong>{(this.state.timeLeft / 1000).toFixed(2)} secondes</strong></h2>
            <p>Bulles libérées: {this.state.score}</p>
            {this.state.player.length > 0 && <p>Joueur: <strong>{this.state.player}</strong></p>}
        </div>
      : <div className="text-center mt-10">
          <h2><strong>Prêt à libérer un maximum de bulles ?</strong></h2>
          <p>Remuer votre téléphone ou appuyez sur espace</p>
          <button className="btn gameOn" onClick={this.play.bind(this)}>Jouer</button>
        </div>
      }
    </div>)
  }
}