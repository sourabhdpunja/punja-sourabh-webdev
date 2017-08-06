/**
 * Created by Sourabh Punja on 8/5/2017.
 */
/**
 * Created by Sourabh Punja on 7/22/2017.
 */

(function (){
    angular
        .module("WamApp")
        .controller("FlickrController",FlickrController);

    function FlickrController($routeParams,flickrService,widgetService,$location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init(){
            widgetService
                .findAllWidgetsForThePage(model.userId,model.websiteId,model.pageId)
                .then(function (widgetlist){
                    model.widgets=widgetlist;
                });
        }
        init();

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.getWidgetUrlForType = getWidgetUrlForType;

        function selectPhoto(photo){
            var photourl = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg"
            var photowidget = {url:photourl};
            flickrService
                .updatePhoto(model.userId,model.websiteId,model.pageId,model.widgetId,photowidget)
                .then(function (widget){
                    model.widget=widget;
                    $location.url('/user/'+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                });
        }
        // ng-src="https://farm{{photo.farm}}.staticflickr.com/{{photo.server}}/{{photo.id}}_{{photo.secret}}_s.jpg"
        
        function searchPhotos(searchText) {
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                    // console.log(response.data);
                });


        }

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }


    }
})();