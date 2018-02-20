import React, {Component} from 'react';

export default class Results extends Component {
  componentDidMount() {
    this.props.ajax()
  }

  render() {
    return (
      <div className="results text-center mt-4">
      { this.props.score && <h2><strong>Vous avez libérés {this.props.score} bulles sacrées {this.props.player && `(${this.props.player})`}</strong></h2>}

      {this.props.player.length === 0 &&
      <form onSubmit={ e => {e.preventDefault();this.props.onSubmit(e)} } className="mb-5 mt-5">
        <fieldset>
          <legend>Quel est votre nom jeune pèlerin?</legend>
          <div className="form-group col-md-6 offset-md-3 text-left">
            <input required type="text" className="form-control" placeholder="Frère Louis, Paul, Jeanne..." id="playerName" name="playerName" />
          </div>
          <button type="submit" className="btn btn-success">Valider</button>

        </fieldset>
      </form>}
      {this.props.rank.length === 0 && <h2>Chargement des résultats...</h2>}

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
              {this.props.rank.length === 0 ? <tr><td>Chargement des résultats...</td></tr> :
              this.props.rank.length && this.props.rank.map((res, rank) => {
              let isMe = false
              if (this.props.score > 0 && this.props.player.length > 0) {
                isMe = this.props.score === res.score && this.props.player === res.pseudo
              }

              return (
              <tr key={`winner-${rank}`} className={rank === 0 ? "table-primary font-weight-bold" : isMe ? "table-active" : ""}>
                <th scope="row">{rank + 1}</th>
                <td>{res.pseudo}</td>
                <td>{res.score}</td>
            </tr>)})}
          </tbody>
        </table>
      </div>
    </div>
  )}
}