/**
 * Created by Sourabh Punja on 7/22/2017.
 */

(function (){
    angular
        .module("WamApp")
        .controller("WidgetEditController",WidgetEditController);

    function WidgetEditController($routeParams,widgetService,$location,$sce) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.getBackPositionUrl = getBackPositionUrl;
        model.trustThisContent = trustThisContent;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;
        model.createWidget= createWidget;
        model.updateWidget= updateWidget;
        model.deleteWidget= deleteWidget;

        function init(){
            model.widget = widgetService.findWidgetByWidgetId(model.widgetId);
            model.widgets = widgetService.findAllWidgetsForThePage(model.pageId);

        }
        init();

        function createWidget(widget){
            widget.pageId = model.pageId;
            widgetService.createWidget(widget);
            $location.url('/user/'+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");
        }

        function updateWidget(widget){
            widgetService.updateWidget(model.widgetId,widget);
            $location.url('/user/'+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");
        }

        function getBackPositionUrl(Type){
            switch (Type){
                case 'Header':
                    $location.url('/user/'+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" );
                    break;
                case 'Image':
                    $location.url('/user/'+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");
                    break;
                case 'Youtube':
                    $location.url('/user/'+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");
                    break;
            }
        }
        function trustThisContent(html){
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(youTubeLink) {
            var embedUrl = "https://www.youtube.com/embed/";
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }
    }
    })();
