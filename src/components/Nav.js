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
    <ul className='nav'>
      {routes.map( r =>
        <li>
          <NavLink exact activeClassName='active' to={`/${r}`}>{r}</NavLink>
        </li>
      )}
    </ul>