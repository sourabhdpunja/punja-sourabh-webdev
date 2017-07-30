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
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites){
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.userId,model.websiteId)
                .then(function (website){
                    model.website = website;
                });
        }
        init();

        //implementation
        function updateWebsite(website){
            websiteService
                .updateWebsite(model.userId,model.websiteId,website)
                .then(function (){
                    $location.url('/user/'+ model.userId + "/website");
                });
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(model.userId,websiteId)
                .then(function (){
                $location.url('/user/'+ model.userId + "/website");
            });
        }

    }
})();
