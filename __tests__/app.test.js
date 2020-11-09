const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

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
});
