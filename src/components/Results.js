import React from 'react';

const fake = [{
  id: 1,
  name: "lolo",
  score: 312736821638712
}, {
  id: 2,
  name: "coco",
  score: 2
}]



export default (props) =>
  <div className="results text-center">
    <p>Your score is {props.score} {props.player && `(${props.player})`}</p>
    <p>Fin du jeu le 15/02/2018 à 18h</p>

    {props.player.length === 0 && <form onSubmit={ e => {e.preventDefault();props.onSubmit(e)} }>
      <fieldset>
        <legend>Quel est votre nom jeune pèlerin?</legend>
        <div className="form-group col-md-6 offset-md-3 text-left">
          <input required type="text" className="form-control" placeholder="Frère Louis, Paul, Jeanne..." id="playerName" name="playerName" />
        </div>
        <button type="submit" className="btn btn-primary">Valider</button>

      </fieldset>
    </form>}

    <table className="table text-left">
      <thead>
        <tr>
          <th scope="col">Classsement</th>
          <th scope="col">Joueur</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {fake.map((res, rank) => (
          <tr key={`winner-${rank}`} className={rank === 0 ? "table-primary font-weight-bold" : ""}>
            <th scope="row">{rank + 1}</th>
            <td>{res.name}</td>
            <td>{res.score}</td>
        </tr>))}
      </tbody>
  </table>

  </div>