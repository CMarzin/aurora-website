import Video from './Video'
import React from 'react'
import MovieData from '../data/movie'

const Movie = () => {
  return (
    <div className="movie_container">
      <div className="text machin movie_text">
        <div className="movie_message">
          <h3>{ MovieData.title }</h3>
        </div>
        <div className="movie_description">
          <p> { MovieData.description }</p>
        </div>
      </div>
      <Video id={null}/>
    </div>
  )
}

export default Movie