const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', require('./routes/mainroute'));

app.listen(3000, () => console.log(' server started '));
