/**
 * Created by Sourabh Punja on 7/19/2017.
 */

/**
 * Created by Sourabh Punja on 7/17/2017.
 */
(function (){
    //iife immediately invoked function expression
    angular
        .module("WamApp")
        .controller("logincontroller",logincontroller)
        .controller("profileController",profileController)
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when("/login",{
                templateUrl:"user/templates/login.view.client.html"})

            .when("/profile/:userId",{
                templateUrl:"user/templates/profile.view.client.html"})

            .when("/register",{
                templateUrl:"user/templates/register.view.client.html"})
    }

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function logincontroller($scope, $location) {
        // JSON = Javascript Object Notation

        $scope.login = function (user) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === user.username && _user.password === user.password) {
                    $location.url("profile/"+_user._id)
                }
                // alert(user.username + ' ' + user.password);
            }
            $scope.errorMessage = "User not found";
        }
    }

    function profileController($scope, $routeParams) {
        var userId = $routeParams["userId"];
        for (var u in users) {
            if(users[u]._id === userId){
                $scope.user = users[u];
            }
        }
    }
})();