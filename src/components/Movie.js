import Video from './Video'
import React from 'react'
import MovieData from '../data/movie'

const Movie = () => {
  return (
    <Video id={null} text={MovieData.description} />
  )
}

export default Movie