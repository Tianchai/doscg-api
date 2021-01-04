const express = require('express');
const cramersRule = require('../utils/cramer-rule');

const router = express.Router();

/* Task 1 */
// General form for sequences: a(n) = a(n^n) + b(n^(n-1)) + ... + c(n^(n-n))
// ref: https://krubowky.files.wordpress.com/2012/12/e0b980e0b8ade0b881e0b8aae0b8b2e0b8a3e0b89be0b8a3e0b8b0e0b881e0b8ade0b89ae0b881e0b8b2e0b8a3e0b980e0b8a3e0b8b5e0b8a2e0b899e0b980e0b8a3.pdf
function getCofactor(n, input) {
  const result = [];
  for (let i = input.length - 1; i >= 0; i--) {
    result.push(Math.pow(n, i));
  }
  return result;
}

function getSequence(n, coEff) {
  let result = 0;
  let index = 0;
  for (let i = coEff.length - 1; i >= 0; i--) {
    result += coEff[index++] * Math.pow(n, i);
  }
  return result;
}

router.post('/task-1', (req, res, next) => {
  const data = req.body;
  const matrix = [];
  const freeTerms = [];
  const input = Object.entries(data).filter(([key, value]) => value != '');
  for (const [key, value] of Object.entries(data)) {
    if (value != '') {
      matrix.push(getCofactor(key, input));
      freeTerms.push(value);
    }
  }
  const coEfficient = cramersRule(matrix, freeTerms);
  for (const [key, value] of Object.entries(data)) {
    data[key] = getSequence(key, coEfficient);
  }
  res.json(data);
});

module.exports = router;
