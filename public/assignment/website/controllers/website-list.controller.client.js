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
            model.websites = websiteService.findWebsitesForUser(model.userId);
            console.log(model.websites);
        }
        init();
    }
})();