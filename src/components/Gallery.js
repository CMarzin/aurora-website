import React, { Component } from 'react';
import Instafeed from 'react-instafeed';
import axios from 'axios';

export default class Gallery extends Component {
  render() {
    return(
    <div id="instafeed">
      <Instafeed
        limit='5'
        get='user'
        sortBy='most-recent'
        template='<a target="_blank" href="{{link}}"><img src="{{image}}" /></a>'
        userId='7085883152'
        clientId='7a8e7c0d028b4f8dae14f1502fd8d757'
        accessToken="341467565.7a8e7c0.936093f1370b42e4ba7cc498c8bb1e4c"
      />
    </div>
    )
  }
}
