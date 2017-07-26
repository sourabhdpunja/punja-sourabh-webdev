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
            model.pages = pageService.findAllPagesByWebsiteId(model.websiteId);
        }
        init();

        function createPage(page){
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page")
        }
    }

})();