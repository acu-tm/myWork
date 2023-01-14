const cors = require('cors');

const express = require('express');
const app = express();

//enable cross origin requests
app.use(cors());

const authRoutes = require("./routes/auth.js");

const ServerPort = process.env.PORT || 5000;

//enable to call enviroment vars
require('dotenv').config();

//enable to pass json payloads from backend to frontend         *
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    res.send('Server Page');
});

app.use('/auth', authRoutes);

app.listen(ServerPort, () => console.log(`Server is waiting on port ${ServerPort}`));