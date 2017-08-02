/**
 * Created by Sourabh Punja on 8/1/2017.
 */
(function () {
    angular
        .module("wbdvDirectives",[])
        .directive("wdSortable",wdSortable);

    function wdSortable(){
        function linkFunction(scope, element) {
            console.log(element);
            var start = -1;
            var end = -1;
            $(element).sortable({
                placeholder: "ui-state-highlight",
                helper:'clone',
                start: function (event,ui) {
                    start = $(ui.item).index();
                },
                stop: function(event,ui){
                    end = $(ui.item).index();
                    scope.model.sort(start,end);
                }
            });
        }

        return {
            scope: {},
            link: linkFunction,
            controller: "sortableController",
            controllerAs: "model"
        }

        // function sortableController(){
        //     var model = this;
        //     model.sort = sort;
        //
        //     function sort() {
        //         console.log("inside sort");
        //     }
        // }
    }
})();