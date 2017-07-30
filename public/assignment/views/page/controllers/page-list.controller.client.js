/**
 * Created by Sourabh Punja on 7/22/2017.
 */
(function (){
    angular
        .module("WamApp")
        .controller("PageListController",PageListController);

    function PageListController(pageService,$routeParams) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;

        function init(){
            pageService
                .findAllPagesByWebsiteId(model.userId,model.websiteId)
                .then(function (pages){
                    model.pages=  pages;
                });
            // model.pages = pageService.findAllPagesByWebsiteId(model.websiteId)
        }
        init();
    }
})();
