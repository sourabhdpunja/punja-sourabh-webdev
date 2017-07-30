/**
 * Created by Sourabh Punja on 7/21/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams.userId;

        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites){
                    model.websites = websites;
                });
        }
        init();

        //implementation
        function createWebsite(website){
            // website.developerId = model.userId;
            // websiteService.createWebsite(website);
            // $location.url('/user/'+ model.userId + "/website");
            websiteService
                .createWebsite(model.userId,website)
                .then(function (website){
                    $location.url('/user/'+ model.userId + "/website");
                });
        }
    }
})();