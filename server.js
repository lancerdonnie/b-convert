const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', require('./routes/mainroute'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(' server started '));
