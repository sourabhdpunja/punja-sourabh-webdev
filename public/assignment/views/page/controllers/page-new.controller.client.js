/**
 * Created by Sourabh Punja on 7/22/2017.
 */

(function (){
    angular
        .module("WamApp")
        .controller("NewPageController",NewPageController);
    
    function NewPageController(pageService,$routeParams,$location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;

        model.createPage= createPage;
        function init() {
            pageService
                .findAllPagesByWebsiteId(model.userId,model.websiteId)
                .then(function (pages){
                    model.pages=  pages;
                });
            // model.pages = pageService.findAllPagesByWebsiteId(model.websiteId);
        }
        init();

        function createPage(page){
            pageService.createPage(model.userId,model.websiteId,page)
                .then(function(){
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                });
        }
    }

})();