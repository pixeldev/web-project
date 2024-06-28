const express = require('express');
const cors = require('cors');
const {connectToDatabase, client} = require('./database');

connectToDatabase();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/address', require('./address'));
app.use('/login', require('./login'));
app.use('/service', require('./service'));
app.use('/signup', require('./signup'));
app.use('/user', require('./user'));
app.use('/user/service', require('./user/service'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});