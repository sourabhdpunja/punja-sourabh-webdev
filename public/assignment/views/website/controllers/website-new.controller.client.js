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
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        //implementation
        function createWebsite(website){
            website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+ model.userId + "/website");
        }
    }
})();