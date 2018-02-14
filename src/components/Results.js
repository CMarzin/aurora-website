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
    <p>Your score is {props.score}</p>
    <p>Fin du jeu le 15/02/2018 à 18h</p>

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