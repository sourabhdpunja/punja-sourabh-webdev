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
        .controller("loginController",loginController);

    function loginController($scope,$location, userService) {
        // JSON = Javascript Object Notation
        function init() {
            alert("inside init")
        }
        init();
        // var model = this;
        $scope.login = login;



        function login(user) {
            alert(user.username + " " + user.password);
            // if (!user){
            //     $scope.errorMessage = "User not found";
            //     return;
            // }
            var user = userService.findUserByUsernameAndPassword(_user)
            if (user == null) {
                $scope.errorMessage = "User not found";
            } else {
                $location.url("profile/" + _user._id)
            }
        }

    }
})();