require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express();
app.use( cors() );


dbConnection();

const port = process.env.PORT;
app.get( '/', (req, res) => {
    res.json({
        "ok": true,
        msg: "Hola Mundo "
    });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
