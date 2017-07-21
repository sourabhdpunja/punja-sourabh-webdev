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

    function profileController($routeParams,userService) {
        var userId = $routeParams["userId"];
        var model = this;

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            model.user = userService.findUserById(userId);
            // console.log(model.user);
    }
        init();

        function updateUser(user) {
            model.user = userService.updateUser(user._id,user);
        }

        function unregister() {

        }


    }
})();