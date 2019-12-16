const express = require('express');

const router = express.Router();
const betkingbook = require('../betkingbook');
const bet9jabook = require('../bet9jabook');

const bet9ja = require('../index');
const betking = require('../betking');

router.get('/', (req, res) => {
  res.send('testing');
});

router.post('/', (req, res) => {
  const { from, to, code } = req.body;
  switch (from) {
    case 'betking':
      if (!to || !code)
        return res.status(400).send('enter a correct to or code');
      if (to === 'bet9ja') {
        (async () => {
          let newCode = await betkingbook(code);
          let resultCode = await bet9ja(newCode);
          res.send(resultCode);
        })();
      } else {
        res.status(400).send('can only convert to bet9ja');
      }
      break;
    case 'bet9ja':
      if (!to || !code) res.status(400).send('enter a correct to or code');
      if (to === 'betking') {
        (async () => {
          let newCode = await bet9jabook(code);
          let resultCode = await betking(newCode);
          res.send(resultCode);
        })();
      } else {
        res.status(400).send('can only convert to betking');
      }
      break;
    default:
      // res.status(400).send('enter a correct details');
      break;
  }
});

module.exports = router;
