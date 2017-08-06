/**
 * Created by Sourabh Punja on 8/4/2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var db = require("../database");

var userModel = mongoose.model('UserModel',userSchema);
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;

module.exports = userModel;

function findUserByCredentials(username,password){
    // console.log(userModel.findOne({username:username,password:password}));
    return userModel.findOne({username:username,password:password});
}

function createUser(user){
    return userModel.create(user);
}

function updateUser(userId, user){
    return userModel.update({_id:userId},
        {$set: user});
}

function findUserById(userId){
    return userModel.findById(userId);
}