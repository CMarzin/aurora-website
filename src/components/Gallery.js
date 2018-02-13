import React, { Component } from 'react';
import Instafeed from 'react-instafeed';

export default class Gallery extends Component {
  render() {
    return(
    <div id="instafeed" className="row">
      <Instafeed
        limit='50'
        get='user'
        resolution='standard_resolution'
        sortBy='most-recent'
        template='<a class="col-lg-3 col-md-4  col-sm-6
          instafeed__child" target="_blank" href="{{link}}">
          <img class="col" data-width="{{width}}" data-height="{{height}}" src="{{image}}" /></a>'
        userId='7085883152'
        clientId='7a8e7c0d028b4f8dae14f1502fd8d757'
        accessToken="341467565.7a8e7c0.936093f1370b42e4ba7cc498c8bb1e4c"
      />
    </div>
    )
  }
}
