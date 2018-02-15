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
  <div className="results text-center mt-4">
    { props.score && <h2><strong>Vous avez libérés {props.score} bulles sacrées {props.player && `(${props.player})`}</strong></h2>}
    <p>Fin du jeu le 16/02/2018 à 12h</p>

    {props.player.length === 0 &&
    <form onSubmit={ e => {e.preventDefault();props.onSubmit(e)} } className="mb-5 mt-5">
      <fieldset>
        <legend>Quel est votre nom jeune pèlerin?</legend>
        <div className="form-group col-md-6 offset-md-3 text-left">
          <input required type="text" className="form-control" placeholder="Frère Louis, Paul, Jeanne..." id="playerName" name="playerName" />
        </div>
        <button type="submit" className="btn btn-success">Valider</button>

      </fieldset>
    </form>}

    <div className="col-md-8 offset-md-2 p-0">
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
  </div>