/**
 * Created by Sourabh Punja on 8/1/2017.
 */
(function() {
    angular
        .module("wbdvDirectives")
        .controller("sortableController", sortableController);

    function sortableController(widgetService,$routeParams){
        var model = this;
        model.pageId = $routeParams.pageId;
        model.sort = sort;
        
        function sort(start,end) {
            widgetService
                .sort(model.pageId,start,end);
        }
    }
})();