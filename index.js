// implement your API here

const express = require('express')
const data = require('./data/db.js');

const server = express();

server.listen(5000, () => {
    console.log("*** listening on port 5000")
});

server.use(express.json());

server.post("/api/users/", (req, res) => {
    const userInfo = req.body;
    if(userInfo.name && userInfo.bio) {
        data.insert(userInfo)
        .then(user => {
            res.status(201).json({success:true, user})
        })
        .catch(err => {
            res.status(500).json({success:false, errorMessage: "There was an error while saving the user to the database"})
        })
    }
    else{
        res.status(400).json({success:false, errorMessage: "Please provide name and bio for the user."})
    }
    
})

server.get("/api/users", (req, res) => {
    data.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({success:false, err})
        })
})