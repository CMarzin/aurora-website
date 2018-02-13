import React, { Component } from 'react';
import './App.css';

// components
import Home from './components/Home';
import Game from './components/Game';
import Nav from './components/Nav';
import Movie from './components/Movie';
import Trailer from './components/Trailer';
import Synopsis from './components/Synopsis';
import MakingOf from './components/MakingOf';
import Gallery from './components/Gallery';

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;


export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />

          <Switch>
            <Route exact path='/' component={Movie}/>
            <Route exact path='/film' component={Movie}/>
            <Route exact path='/jeux' component={Game} />
            <Route exact path='/trailer' component={Trailer} />
            <Route exact path='/synopsis' component={Synopsis} />
            <Route exact path='/making-of' component={MakingOf}/>
            <Route exact path='/gallery' component={Gallery}/>
            <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}