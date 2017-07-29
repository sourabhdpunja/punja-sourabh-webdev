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

        function findWebsiteById(websiteId){
             var website = websites.find(function (website){
               return website._id === websiteId;
            });
             return angular.copy(website);
        }
        
        function findWebsitesForUser(userId) {
            // console.log(userId);
            var url = "/api/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }
        function createWebsite(website){
            website._id = (new Date()).getTime() + "";
            websites.push(website);
            return website;
        }

        function updateWebsite(websiteId,website){
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites[w] = website;
                    return websites[w];
                }
            }
            return null;
        }
        function deleteWebsite(websiteId){
            for(var w in websites) {
                if (websites[w]._id === websiteId) {
                    var index = websites.indexOf(websites[w]);
                    websites.splice(index, 1);
                    return;
                }
            }
        }
    }
})();