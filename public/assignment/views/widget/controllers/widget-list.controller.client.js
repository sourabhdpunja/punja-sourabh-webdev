/**
 * Created by Sourabh Punja on 7/22/2017.
 */
(function() {
    angular
        .module("WamApp")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController(widgetService,$routeParams,$sce) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.trustThisContent = trustThisContent;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;


        function init() {
            var widgetlist = widgetService.findAllWidgetsForThePage(model.pageId);
            for (var w in widgetlist){
                        if (typeof widgetlist[w].text === 'undefined' && widgetlist[w].widgetType === 'HEADING')
                        {
                            widgetlist.splice(w,1);
                        }
                        else if (typeof widgetlist[w].url === 'undefined' && widgetlist[w].widgetType === 'IMAGE')
                        {
                            widgetlist.splice(w,1);
                        }
                        else if (typeof widgetlist[w].url === 'undefined' && widgetlist[w].widgetType === 'YOUTUBE')
                        {
                            widgetlist.splice(w,1);
                        }
                        else{
                            continue;
                        }
            }
            model.widgets = widgetlist;
        }
        init();

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