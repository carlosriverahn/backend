require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express();
const port = process.env.PORT;

app.use( express.json() );
app.use( cors() );
dbConnection();

app.use('/api/users', require('./routes/users') );
app.use('/api/login', require('./routes/auth') );

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
