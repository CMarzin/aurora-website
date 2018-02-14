import React from 'react';
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

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
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse ">
      <ul className="navbar-nav ml-auto">
          {routes.map((r, i) =>
            <li className="nav-item" key={`nav-child-${i}`}>
              <NavLink exact className="nav-link" activeClassName='active-nav' to={`/${r}`}>{r}</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
