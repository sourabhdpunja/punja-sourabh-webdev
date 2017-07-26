/**
 * Created by Sourabh Punja on 7/22/2017.
 */

(function (){
    angular
        .module("WamApp")
        .controller("WidgetNewController",WidgetNewController);

    function WidgetNewController($routeParams,widgetService,$location,$sce) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.trustThisContent = trustThisContent;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;

        model.createWidget=createWidget;
        function init(){
            var widgetlist = widgetService.findAllWidgetsForThePage(model.pageId);
            for (var w in widgetlist){
                if (typeof widgetlist[w].text === 'undefined' && widgetlist[w].widgetType === 'HEADING')
                {
                    widgetlist.splice(w,1);
                    break;
                }
                else if (typeof widgetlist[w].url === 'undefined' && widgetlist[w].widgetType === 'IMAGE')
                {
                    widgetlist.splice(w,1);
                    break;
                }
                else if (typeof widgetlist[w].url === 'undefined' && widgetlist[w].widgetType === 'YOUTUBE')
                {
                    widgetlist.splice(w,1);
                    break;
                }
                else{
                    continue;
                }
            }
            model.widgets = widgetlist;
        }
        init();
        var widget ={};
        function createWidget(Type) {
            switch (Type){
                case 'Header':
                    widget.widgetType ='HEADING';
                    break;
                case 'Image':
                    widget.widgetType ='IMAGE';
                    break;
                case 'Youtube':
                    widget.widgetType ='YOUTUBE';
                    break;
            }
            widget.pageId = model.pageId;
            widget = widgetService.createWidget(widget);
            $location.url('/user/'+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
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