/**
 * Created by Sourabh Punja on 7/22/2017.
 */

(function (){
    angular
        .module("WamApp")
        .factory("widgetService",widgetService);

    function widgetService($http){

        var api = {
            "findAllWidgetsForThePage": findAllWidgetsForThePage,
            "createWidget": createWidget,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget,
            "findWidgetByWidgetId": findWidgetByWidgetId
            // "deleteInvalidWidget": deleteInvalidWidget
        };

        return api;

        // function deleteInvalidWidget(){
        //     for (var w in widgets){
        //         // console.log(typeof widgets[w].text);
        //         // console.log(typeof widgets[w].url);
        //         if (typeof widgets[w].text === 'undefined' && widgets[w].widgetType === 'HEADING')
        //         {
        //             widgets.splice(w,1);
        //         }
        //         else if (typeof widgets[w].url === 'undefined' && widgets[w].widgetType === 'IMAGE')
        //         {
        //             widgets.splice(w,1);
        //         }
        //         else if (typeof widgets[w].url === 'undefined' && widgets[w].widgetType === 'YOUTUBE')
        //         {
        //             widgets.splice(w,1);
        //         }
        //         else{
        //             continue;
        //         }
        //     }
        //     return widgets;
        // }

        function findWidgetByWidgetId(userId,websiteId,pageId,widgetId) {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })

            // for (var w in widgets){
            //     if (widgets[w]._id === widgetId){
            //         return angular.copy(widgets[w]);
            //     }
            // }
        }

        function findAllWidgetsForThePage(userId,websiteId,pageId) {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
            // widgets = deleteInvalidWidget();
            // var widgetlist=[];
            // for (var w in widgets){
            //     if (widgets[w].pageId === pageId){
            //         widgetlist.push(widgets[w]);
            //     }
            // }
            // return widgetlist;
        }

        function createWidget(userId,websiteId,pageId,widget){
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
            return $http.post(url,widget)
                .then(function (response){
                   return response.data;
                });
            // widget._id = (new Date()).getTime() + "";
            // widgets.push(widget);
            // widgets = widgets.filter( function( eachobject, id, filteredArray ) {
            //     return filteredArray.indexOf(eachobject) == id;
            // });
            //
            // return widget;
        }

        function deleteWidget(userId,websiteId,pageId,widgetId){
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });

            // for (var w in widgets){
            //     if (widgets[w]._id === widgetId){
            //         widgets.splice(w,1);
            //     }
            // }
        }

        function updateWidget(userId,websiteId,pageId,widgetId,widget){
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.put(url,widget)
                .then(function (response){
                    return response.data;
                });

            // for (var w in widgets){
            //     if (widgets[w]._id === widgetId){
            //         widgets[w] = widget;
            //         return widgets[w];
            //     }
            // }
        }
    }
})();