import React from 'react'

export default (props) =>
  <div className="video__container d-flex h-100 justify-content-center aligzn-items-center mt-5">
    <div style={{ width: '100%'}}>
      {!props.id && <p className="lead text-center mb-5"><strong>{props.text}</strong></p>}
      <div className="video__wrapper">
        {props.id && <iframe title="video" className="img-fluid" src={`https://player.vimeo.com/video/${props.id}`} data-width="640" data-height="360" frameBorder="0" allowFullScreen></iframe>}
      </div>
  </div>
</div>

