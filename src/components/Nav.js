import React from 'react';
import logo from '../img/logo.svg';

var NavLink = require('react-router-dom').NavLink;
const routes = [
  'teaser',
  'film',
  'jeu',
  'classement',
  'synopsis',
  'making-of',
  'gallerie'
]

const toogle = (e) => {
  const $ = window.$;
  const menu = document.querySelector('.navbar-toggler')
  if ($(window).width() < 992)
    menu && menu.click()
}

export default () =>
    <nav className="nav navbar navbar-expand-lg navbar-light text-center">
      <NavLink className="navbar-brand" to="/"><img src={logo} height="48"/></NavLink>
      <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style={{}}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav ml-auto">
          {routes.map((r, i) =>
            <li className="nav-item" key={`nav-child-${i}`}>
              <NavLink exact className="nav-link" activeClassName='active-nav' onClick={toogle} to={`/${r}`}>{r.toUpperCase()}</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
