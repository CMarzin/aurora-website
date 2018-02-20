import React, {Component} from 'react';

export default class Results extends Component {
  constructor() {
    super()

    this.state = {
      rank: []
    }
  }
  componentDidMount() {
    const $ = window.$;

    const request1 = $.ajax({
      type: "POST",
      url: 'https://get-letter-api.herokuapp.com/authenticate',
      data: {
        "email": "example@gmail.com",
        "password": "heticp2019",
      },
      success: (auth) => {
        request3(auth.auth_token)
      },
    });

    const request3 = token => $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "https://get-letter-api.herokuapp.com/bubble_games",
      headers: {
        "Authorization": token,
      },
      success: results => {
        const rank = results
          .filter(t => t.score < 500)
          .sort((a, b) => a.score - b.score)
          .reverse()
          .slice(1, 11)
        this.setState({
          rank
        })
      }
    })
  }

  render() {
    return (
      <div className="results text-center mt-4">

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
            {this.state.rank.length === 0 ? <tr><td>Chargement des résultats...</td></tr> :
            this.state.rank.map((res, rank) => {
              return (
              <tr key={`winner-${rank}`} className={rank === 0 ? "table-primary font-weight-bold" : ""}>
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