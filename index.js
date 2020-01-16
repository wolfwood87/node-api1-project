// implement your API here

const express = require('express')
const data = require('./data/db.js');
const cors = require('cors')
const server = express();

server.listen(5000, () => {
    console.log("*** listening on port 5000")
});

server.use(express.json());
server.use(cors());


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
            res.status(500).json({success:false, errorMessage: "The users information could not be retrieved."})
        })
})

server.get("/api/users/:id", (req, res) => {
    const {id} = req.params;
    data.findById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({success:false, message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({success:false, errorMessage: "The user information could not be retrieved."})
        })
})

server.delete("/api/users/:id", (req, res) => {
    const {id} = req.params;

    data.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end()
            }
            else {
                res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({success:false, message: "The user could not be removed."})
        })
})

server.put("/api/users/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    data.update(id, changes)
        .then(updated => {
            if(updated) {
                if(changes.name && changes.bio) {
                    res.status(200).json({success:true, updated})
                }
                else{
                    res.status(400).json({success:false, errorMessage: "Please provide name and bio for the user."})
                }
            }
            else {
                res.status(404).json({success:false, message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({success:false, errorMessage: "The user information could not be modified."})
        })
})