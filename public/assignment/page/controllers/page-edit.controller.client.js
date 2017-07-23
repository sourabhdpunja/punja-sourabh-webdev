/**
 * Created by Sourabh Punja on 7/22/2017.
 */
(function (){
    angular
        .module("WamApp")
        .controller("EditPageController",EditPageController);

    function EditPageController($routeParams,pageService,$location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init(){
        model.pages=pageService.findAllPagesByWebsiteId(model.websiteId);
        model.page = pageService.findPageById(model.pageId);
        }
        init();

        function updatePage(page) {
            pageService.updatePage(model.pageId,page);
        }

        function deletePage(pageId){
            pageService.deletePage(pageId);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }
    }

})();