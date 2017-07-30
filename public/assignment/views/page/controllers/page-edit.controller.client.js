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
            pageService
                .findAllPagesByWebsiteId(model.userId,model.websiteId)
                .then(function (pages){
                    model.pages=  pages;
                });
            pageService
                .findPageById(model.userId,model.websiteId,model.pageId)
                .then(function (page){
                    model.page= page;
                });
        }
        init();

        function updatePage(page) {
            pageService
                .updatePage(model.userId,model.websiteId,model.pageId,page)
                .then(function (page){
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
            });

        }

        function deletePage(pageId){
            pageService
                .deletePage(model.userId,model.websiteId,model.pageId)
                .then(function (){
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                });
        }
    }

})();