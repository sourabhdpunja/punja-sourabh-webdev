/**
 * Created by Sourabh Punja on 7/21/2017.
 */
(function () {
    angular
        .module("WamApp")
        .service("websiteService",  websiteService);

    function websiteService($http) {

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.updateWebsite= updateWebsite;
        this.deleteWebsite= deleteWebsite;
        this.findWebsiteById = findWebsiteById;

        function findWebsiteById(userId,websiteId){
            var url = "/api/user/"+userId+"/website/"+websiteId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
            //  var website = websites.find(function (website){
            //    return website._id === websiteId;
            // });
            //  return angular.copy(website);

        }
        
        function findWebsitesForUser(userId) {
            // console.log(userId);
            var url = "/api/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }
        function createWebsite(userId,website){
            var url = "/api/user/"+userId+"/website";
            return $http.post(url,website)
                .then(function (response){
                    return response.data;
                });
        }

        function updateWebsite(userId,websiteId,website){
            var url = "/api/user/"+userId+"/website/"+websiteId;
            return $http.put(url,website)
                        .then(function (response){
                           return response.data;
                        });
            // for(var w in websites) {
            //     if(websites[w]._id === websiteId) {
            //         websites[w] = website;
            //         return websites[w];
            //     }
            // }
            // return null;
        }
        function deleteWebsite(userId,websiteId){
            var url = "/api/user/"+userId+"/website/"+websiteId;
            return $http.delete(url)
                .then(function (response){
                   return response.data;
                });

            // for(var w in websites) {
            //     if (websites[w]._id === websiteId) {
            //         var index = websites.indexOf(websites[w]);
            //         websites.splice(index, 1);
            //         return;
            //     }
            // }
        }
    }
})();