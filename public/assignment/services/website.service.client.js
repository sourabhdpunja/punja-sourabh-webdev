/**
 * Created by Sourabh Punja on 7/21/2017.
 */
(function () {
    angular
        .module("WamApp")
        .service("websiteService",  websiteService);

    function websiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.updateWebsite= updateWebsite;
        this.deleteWebsite= deleteWebsite;
        this.findWebsiteById = findWebsiteById;

        function findWebsiteById(websiteId){
            return websites.find(function (website){
               return website._id === websiteId;
            });
        }
        
        function findWebsitesForUser(userId) {
            // console.log(userId);
            var sites=[];
            for(var w in websites){
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            // console.log(sites);
            return sites;
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