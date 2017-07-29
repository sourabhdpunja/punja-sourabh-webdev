/**
 * Created by Sourabh Punja on 7/21/2017.
 */
(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);
    
    function websiteListController($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;


        function init() {
            console.log("init");
            //alert("reached weblist controller");
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites){
                model.websites = websites;
                });
            // alert(model.websites);
            console.log(model.websites);
        }
        init();
    }
})();