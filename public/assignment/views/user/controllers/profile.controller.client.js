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
                    var usr = response.data;
                    usr.dob = new Date(usr.dob);
                    model.user = usr;
                    // if (typeof model.user.dob !== 'undefined') {
                    //     model.user.dob = setDate(model.user.dob);
                    // }
                });
            // console.log(model.user);
    }
        init();

        function updateUser(user) {
            userService
                .updateUser(user._id,user)
                .then(function (response){
                    // console.log(model.user);
                    var usr = response.data;
                    usr.dob = new Date(usr.dob);
                   model.user = usr;
                   console.log(typeof model.user.dob);
                   console.log(model.user.dob);
                    if (typeof model.user.dob !== 'undefined') {
                        // var date= model.user.dob;
                        // var formattedDate = date.match(/[\d-]+/).pop();
                        // console.log(formattedDate);
                        // model.user.dob=formattedDate;
                        // // model.user.dob = model.user.dob.date.match(/[\d-]+/).pop()
                        // console.log(typeof model.user.dob);
                        // console.log(model.user.dob);
                        // model.user.dob = setDate(model.user.dob);
                    }
                });
        }

        function deleteUser(user) {
            // model.user = userService.deleteUser(user._id);
            // $location.url("/login");
            userService.deleteUser(user._id)
                .then(function (){
                   $location.url("/login");
                });
        }

        // function setDate(date){
        //     var year=date.getFullYear();
        //     var month=date.getMonth()+1;
        //     if (month<10){
        //         month="0" + month;
        //     };
        //     var day=date.getDate();
        //     date=year + "-" + month + "-" + day;
        //     return date;
        // }
    }
})();