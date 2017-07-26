/**
 * Created by Sourabh Punja on 7/19/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("registerController", registerController);
    
    function registerController(userService, $location) {
        var model = this;


        model.registerUser = registerUser;

        function init() {
           // console.log("Check")
        }
        init();

        function registerUser(user) {
            // console.log("here");
            var _user = userService.findUserByUsername(user.username);
            if(!_user){
                // console.log("registerController");
                // console.log(user);
                var user = userService.registerUser(user);
                console.log(user);
                $location.url("/profile/"+user._id);
            } else {
                model.error = "User already exists";
            }

        }
    }

})();