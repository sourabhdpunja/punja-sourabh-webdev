/**
 * Created by Sourabh Punja on 7/17/2017.
 */

var app = angular.module("WamApp",[]);
app.controller("logincontroller",logincontroller);

function logincontroller($scope) {
    // JSON = Javascript Object Notation
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    $scope.login = function (user) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === user.username && _user.password === user.password) {
            }
            alert(user.username + " " + user.password);
        }
    }
}