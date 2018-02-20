import Video from './Video'
import React from 'react'
import MovieData from '../data/movie'

const Movie = () => {
  return (
    <Video id={256406682} text={MovieData.description} />
  )
}

export default Movie