require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express();
const port = process.env.PORT;

app.use( express.json() );
app.use( cors() );
dbConnection();

app.use('/api/login', require('./routes/auth') );
app.use('/api/users', require('./routes/users') );
app.use('/api/doctors', require('./routes/doctors') );
app.use('/api/hospitals', require('./routes/hospitals') );
app.use('/api/searchs', require('./routes/searchs') );
app.use('/api/upload', require('./routes/uploads') );

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
