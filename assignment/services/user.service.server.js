/**
 * Created by Sourabh Punja on 7/28/2017.
 */
var app = require("../../express");
var userModel = require("../models/user/user.model.server")

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" , isAdmin:true }
];

//html handlers
app.get("/api/users",getAllUsers);
app.get("/api/user/:userId",getUserById);
app.get("/api/user",findUser);
app.post("/api/user",registerUser);
app.put("/api/user/:userId",updateUser);
app.delete("/api/user/:userId",deleteUser);

function deleteUser(req, res) {
    var userId = req.params.userId;
    for(var u in users) {
            if (users[u]._id === userId) {
                var index = users.indexOf(users[u]);
                users.splice(index, 1);
                res.sendStatus(200);
            }
        }
    res.sendStatus(404);
}

function updateUser(req, res){
    var userId = req.params.userId;
    var user = req.body;
    // console.log(typeof user.dob);

    userModel
        .updateUser(userId,user)
        .then(function (status){
            res.json(status);
        },function (err){
            res.sendStatus(404).send(err);
        });
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         // if (typeof user.dob !== 'undefined'){
    //         //     user.dob = new Date(user.dob);
    //         //     // var parts =user.dob.split('-');
    //         //     // user.dob = new Date(parts[2],parts[0]-1,parts[1]);
    //         // }
    //         users[u] = user;
    //         // console.log(typeof users[u].dob);
    //         res.send(users[u]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}
function registerUser(req, res) {
    // console.log("user is inside");
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user){
            res.json(user);
        });

    // user._id = (new Date()).getTime() + "";
    // users.push(user);
}

function findUser(req,response){
    var username = req.query.username;
    var password = req.query.password;

    if (username && password){
        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                response.json(user);
                return;
            },function (err) {
                response.sendStatus(404).send(err);
                return;
                // }
            });
        // for(var u in users) {
        //     var _user = users[u];
        //     if (_user.username === username && _user.password === password) {
        //         response.send(_user);
        //         return;
        //     }
        // }
        return;
    } else if(username){
        for(var u in users) {
            if(users[u].username === username) {
                response.send(users[u]);
                return;
            }
        }
    }
    response.send("0");
}

function getAllUsers(req,response) {
    response.send(users);
}

function getUserById(req,response){

    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            // if (user._id === userId){
                        // if (typeof user.date !== 'undefined'){
                        //     user.toISOString().split("T")[0];
                        // }
            response.json(user);
        // }
        });
    // for(var u in users){
    //     console.log(users);
    //     if (users[u]._id === req.params.userId){
    //         // if (typeof users[u].date !== 'undefined'){
    //         //     users[u].toISOString().split("T")[0];
    //         // }
    //         response.send(users[u]);
    //     }
    // }
}

