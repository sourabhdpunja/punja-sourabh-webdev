/**
 * Created by Sourabh Punja on 7/25/2017.
 */
(function (){
    angular
        .module("WamApp")
        .controller("homeController",homeController)
    
    function homeController(userobject,userService,$location) {
        var model = this;
        model.logout = logout;
        function init() {
        model.currentUser = userobject;
        }
        init();

        function logout(){
            userService
                .logout()
                .then(function (){
                    $location.url('/login');
                });
        }
    }

})();