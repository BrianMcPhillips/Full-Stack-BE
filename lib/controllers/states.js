const { Router } = require('express');
const State = require('../models/stateModel');

module.exports = Router()
  .post('/', (req, res, next) => {
    State
      .insert(req.body)
      .then(state => res.send(state))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    State
      .find()
      .then(states => res.send(states))
      .catch(next);
  });
