const pool = require('../utils/pool');

class State {
  id;
  stateName;
  electoralVotes;
  winner;

  constructor(row) {
    this.id = row.id;
    this.stateName = row.state_name;
    this.electoralVotes = row.electoral_votes;
    this.winner = row.winner;
  }
  static async insert(state) {
    const { rows } = await pool.query(`INSERT INTO states 
    (state_name, electoral_votes, winner)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [state.stateName, state.electoralVotes, state.winner]);

    return new State(rows[0]);
  }
}

module.exports = State;