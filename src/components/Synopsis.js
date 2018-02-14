import React from 'react'
import SynopsisData from '../data/synopsis'

const Synopsis = () => {
  return (
    <div className="synopsis_container">

      <div className="Synopsis_image"></div>

      <div className="synopsis_story">
        <h2>{ SynopsisData.story.title }</h2>
        <p>{ SynopsisData.story.description }</p>
      </div>

      <div className="synopsis_character">
        <h2>{ SynopsisData.character.title }</h2>
        <ul className="trolo synopsis_characters">
          {SynopsisData.character.characters.map((item, index) => (
            <li key={ index }>
              <span></span>
              <h3>{ item.name }</h3>
              <p>{ item.description }</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="Synopsis_explanation">
        <h2>{ SynopsisData.explanation.title }</h2>
        <p>{ SynopsisData.explanation.description }</p>
      </div>

      <div className="synopsis_squad">
        <ul className="synopsis_people">
          {SynopsisData.squad.map((item, index) => (              
            <li key={ index }>
              <h3 >{ item.name }</h3>
              <p>{ item.role }</p>
            </li>
          ))}
        </ul>          
      </div>

    </div>
  )
}

export default Synopsis;