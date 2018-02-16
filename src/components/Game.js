import React, {Component} from 'react';
import Shake from 'shake.js'
import p5 from 'p5';

import { setup, draw, setBubbles, windowResized, clearBubbles} from './Sketch';
import Results from './Results'
import bubbleSound from '../sounds/bulles.mp3'

let visual = new p5()
const countdownLimit = 3;
// P5
window.setup = setup
window.draw = draw
window.windowResized = windowResized

const endDate = new Date("February 16, 2018 22:00:00");

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
      countdown: 0,
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

    try {navigator.vibrate(500 * this.state.resistance)} catch (e) {}

    return audio;
  }

  play() {
    this.pop()

    this.setState({
      countdown: countdownLimit,
      gameIsOn: true,
      score: 0,
      timeLeft: this.props.timeout,
    })

    const countdown = setInterval(() => {
      if (this.state.countdown > 1)
        this.setState({
          countdown: this.state.countdown - 1
        })
      else {
        clearInterval(countdown)

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
          resistance: 0,
          shakeCount: 0,
          timePassed: 0,
          gameIsOn: true,
          rank: [],
          countdown: 0,
        })

        this.timeout = setTimeout(() => {
          this.stop()
        }, this.props.timeout);
      }
    }, 1000)
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
    try { navigator.vibrate(0) } catch (e) { }

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

  ajaxThis(complete) {
    const $ = window.$;
    if (this.state.score > 0 && this.state.player.length > 0) {
      complete = true;
    }

    const request1 = $.ajax({
      type: "POST",
      url: 'https://get-letter-api.herokuapp.com/authenticate',
      data: {
        "email": "example@gmail.com",
        "password": "heticp2019",
      },
      success: (auth) => {
        if (this.state.score > 500) {
          return alert("trouve toi une copine")
        }
        complete ? request2(auth.auth_token) : request3(auth.auth_token)
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
        "Authorization": token,
      },
      success: results => {
        const rank = results
          .filter(t => t.score < 500)
          .sort((a, b) => a.score - b.score)
          .reverse()
          .slice(1, 11)
        this.setState({
          rank
        })
      }
    })
  }

  setPlayer(event) {
    const data = window.$(event.target).serializeArray()[0]
    this.setState({ player: data.value })

    this.ajaxThis(true)
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
            rank={this.state.rank || []}
            ajax={this.ajaxThis.bind(this)}
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
          rank={this.state.rank}
          ajax={this.ajaxThis.bind(this)}
          />}
        <pre>{false && JSON.stringify(this.state, null, 2)}</pre>
        {(this.state.countdown <= countdownLimit && this.state.countdown > 0) && <p className="display-4">{this.state.countdown}</p>}
      {this.state.gameIsOn ?
        <div className="gameIsOn">
            <h2 className="time"><strong>{(this.state.timeLeft / 1000).toFixed(2)} secondes</strong></h2>
            <p>Bulles libérées: {this.state.score}</p>
            {this.state.player.length > 0 && <p>Joueur: <strong>{this.state.player}</strong></p>}
        </div>
      : <div className="text-center mt-10">
          <h2><strong>Prêt à libérer un maximum de bulles ?</strong></h2>
          <p>Secouez votre téléphone ou appuyez sur espace</p>
          <button className="btn gameOn" onClick={this.play.bind(this)}>Jouer</button>
        </div>
      }
    </div>)
  }
}