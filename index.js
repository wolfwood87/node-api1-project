// implement your API here

const express = require('express')
const data = require('./data/db.js');

const server = express();

server.listen(5000, () => {
    console.log("*** listening on port 5000")
});

server.use(express.json());

server.get('/api/users', (req, res) => {
    data.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({success:false, err})
        })
})