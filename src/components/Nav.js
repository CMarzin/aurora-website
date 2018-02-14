import React from 'react';

var NavLink = require('react-router-dom').NavLink;
const routes = [
  'trailer',
  'film',
  'jeux',
  'synopsis',
  'making-of',
  'gallery'
]

export default () =>
    <nav className="nav navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">LOGO</NavLink>
      <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style={{}}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav ml-auto">
          {routes.map((r, i) =>
            <li className="nav-item" key={`nav-child-${i}`}>
              <NavLink exact className="nav-link" activeClassName='active' to={`/${r}`}>{r}</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
