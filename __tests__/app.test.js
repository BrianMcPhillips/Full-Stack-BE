const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const State = require('../lib/models/stateModel');

describe('Full-Stack-BE routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a state via post', () => {
    return request(app)
      .post('/api/v1/states')
      .send({
        stateName: 'California',
        electoralVotes: 55,
        winner: 'Joe Biden'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          stateName: 'California',
          electoralVotes: 55,
          winner: 'Joe Biden'
        });
      });
  });

  it('finds all states via GET', async() => {
    const states = await Promise.all([
      State.insert({ stateName: 'Arizona', electoralVotes: 11, winner: 'Joe Biden' }),
      State.insert({ stateName: 'Oregon', electoralVotes: 7, winner: 'Joe Biden' }),
      State.insert({ stateName: 'Washington', electoralVotes: 12, winner: 'Joe Biden' }),
    ]);

    return request(app)
      .get('/api/v1/states')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining(states));
      });
  });
});
