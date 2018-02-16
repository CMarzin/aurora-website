import React from 'react'
import SynopsisData from '../data/synopsis'

const Synopsis = () => {
  return (
    <div className="synopsis_container">

      <div className="synopsis_image"></div>

      <div className="container">
        <div className="synopsis_story">
          <h3>{ SynopsisData.story.title }</h3>
          <p>{ SynopsisData.story.description }</p>
        </div>

        <div className="synopsis_character">
          <h3>{ SynopsisData.character.title }</h3>
          <ul className="row synopsis_characters m-0">
            {SynopsisData.character.characters.map((item, index) => (
              <li key={ index } className="col-md-4 text-center">
                <span></span>
                <h4>{ item.name }</h4>
                <p>{ item.description }</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="Synopsis_explanation">
          <h3>{ SynopsisData.explanation.title }</h3>
          <p>{ SynopsisData.explanation.description }</p>
        </div>

        <div className="synopsis_squad">
          <ul className="synopsis_people">
            {SynopsisData.squad.map((item, index) => (
              <li key={ index } className="col-md-6">
                <h4>{ item.name }</h4>
                <p>{ item.role }</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Synopsis;