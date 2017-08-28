/**
 * Created by Sourabh Punja on 8/26/2017.
 */
(function (){
    angular
        .module("WamApp")
        .controller("adminUsersController",adminUsersController)

    function adminUsersController(userobject,userService,$location) {
        var model = this;
        model.deleteUser = deleteUser;
        function init() {
            model.currentUser = userobject;
            findAllUsers();
        }
        init();

        function deleteUser(user){
            userService
                .deleteUser(user._id)
                .then(function (){
                    findAllUsers();
                });
        }

        function findAllUsers(){
            userService
                .findAllUsers()
                .then(function (users){
                    model.users = users;
                });
        }

    }

})();