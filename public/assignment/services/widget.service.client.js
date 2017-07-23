/**
 * Created by Sourabh Punja on 7/22/2017.
 */

(function (){
    angular
        .module("WamApp")
        .factory("widgetService",widgetService);

    function widgetService(){

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>GIXMODO</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "findAllWidgetsForThePage": findAllWidgetsForThePage,
            "createWidget": createWidget,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget,
            "findWidgetByWidgetId": findWidgetByWidgetId,
            "deleteInvalidWidget": deleteInvalidWidget
        };

        return api;

        function deleteInvalidWidget(){
            for (var w in widgets){
                console.log(typeof widgets[w].text);
                console.log(typeof widgets[w].url);
                if (typeof widgets[w].text === 'undefined' && widgets[w].widgetType === 'HEADING')
                {
                    widgets.splice(w,1);
                }
                else if (typeof widgets[w].url === 'undefined' && widgets[w].widgetType === 'IMAGE')
                {
                    widgets.splice(w,1);
                }
                else if (typeof widgets[w].url === 'undefined' && widgets[w].widgetType === 'YOUTUBE')
                {
                    widgets.splice(w,1);
                }
                else{
                    continue;
                }
            }
            return widgets;
        }

        function findWidgetByWidgetId(widgetId) {
            for (var w in widgets){
                if (widgets[w]._id === widgetId){
                    return widgets[w];
                }
            }
        }

        function findAllWidgetsForThePage(pageId) {
            widgets = deleteInvalidWidget();
            var widgetlist=[];
            for (var w in widgets){
                if (widgets[w].pageId === pageId){
                    widgetlist.push(widgets[w]);
                }
            }
            return widgetlist;
        }

        function createWidget(widget){
            widget._id = (new Date()).getTime() + "";
            widgets.push(widget);
            widgets = widgets.filter( function( eachobject, id, filteredArray ) {
                return filteredArray.indexOf(eachobject) == id;
            });

            return widget;
        }

        function deleteWidget(widgetId){
            for (var w in widgets){
                if (widgets[w]._id === widgetId){
                    widgets.splice(w,1);
                }
            }
        }

        function updateWidget(widgetId,widget){
            for (var w in widgets){
                if (widgets[w]._id === widgetId){
                    widgets[w] = widget;
                    return widgets[w];
                }
            }
        }
    }
})();