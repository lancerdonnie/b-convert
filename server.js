const express = require('express');
const cors = require('cors');
const betkingbook = require('./betkingbook');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/mainroute'));

app.post('/', (req, res) => {
  const { from, to, code } = req.body;
  switch (from) {
    case 'betking':
      if (!to || !code) res.status(400).send('enter a correct to or code');
      if (to === 'bet9ja') {
        (async () => {
          let newCode = await betkingbook(code);
          console.log('new', newCode);
          return res.send(newCode);
        })();
      } else {
        return res.status(400).send('can only convert to bet9ja');
      }
      break;
    case 'bet9ja':
      if (!to || !code) res.status(400).send('enter a correct to or code');
      break;
    default:
      res.status(400).send('enter a correct details');
      break;
  }
});

app.listen(3000, () => console.log(' server started '));
