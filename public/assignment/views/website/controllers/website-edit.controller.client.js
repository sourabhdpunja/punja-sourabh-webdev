/**
 * Created by Sourabh Punja on 7/21/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        //implementation
        function updateWebsite(website){
            websiteService.updateWebsite( model.websiteId,website);
            $location.url('/user/'+ model.userId + "/website");
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+ model.userId + "/website");
        }

    }
})();
