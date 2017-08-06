/**
 * Created by Sourabh Punja on 7/22/2017.
 */
(function () {
    angular
        .module("WamApp")
        .factory("flickrService",flickrService);

    function flickrService($http) {
        var key = "7f525557b1a23854b756ea7055a6d4ce";
        var secret = "0d3fec51f8d53982";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api= {
            "searchPhotos": searchPhotos,
            "updatePhoto": updatePhoto
        };

        return api;

        function updatePhoto(userId,websiteId,pageId,widgetId,photowidget){
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId+"/updateUrl";
            return $http.put(url,photowidget)
                .then(function(response){
                    return response.data;
                });
        }
        function searchPhotos(searchTerm) {
            console.log("Inside Search Term");
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }


})();
