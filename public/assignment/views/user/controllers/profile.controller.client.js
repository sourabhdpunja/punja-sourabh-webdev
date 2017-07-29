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
        .controller("profileController",profileController);

    function profileController($routeParams,$location,userService) {

        var model = this;

        model.userId=$routeParams["userId"];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserById(model.userId)
                .then(function (response){
                    model.user = response.data;
                });
            // console.log(model.user);
    }
        init();

        function updateUser(user) {
            userService.updateUser(user._id,user)
                .then(function (response){
                   model.user = response.data;
                });
        }

        function deleteUser(user) {
            model.user = userService.deleteUser(user._id);
            $location.url("/login");

        }


    }
})();