/**
 * Created by Sourabh Punja on 7/22/2017.
 */
(function () {
    angular
        .module("WamApp")
        .factory("pageService",pageService);

    function pageService($http) {

        var api= {
            "findAllPagesByWebsiteId": findAllPagesByWebsiteId,
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findPageById": findPageById
        };

        return api;

        function findAllPagesByWebsiteId(userId,websiteId){
            var url = "/api/user/"+userId+ "/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var pagelist=[];
            // for (var p in pages){
            //     if (pages[p].websiteId === websiteId){
            //         pagelist.push(pages[p]);
            //     }
            // }
            // return pagelist;
        }

        function findPageById(userId,websiteId,pageId){
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            return $http.get(url)
                .then(function (response){
                   return response.data;
                });
            // for (var p in pages){
            //     if (pages[p]._id === pageId){
            //         return angular.copy(pages[p]);
            //     }
            // }
        }

        function createPage(userId,websiteId,page){
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page";
            return $http.post(url,page)
                .then(function(response){
                   return response.data;
                });
            // page._id = (new Date()).getTime() + "";
            // pages.push(page);
            // return page;
        }

        function updatePage(userId,websiteId,pageId,page){
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            return $http.put(url,page)
                .then(function(response){
                   return response.data;
                });
            // for (var p in pages){
            //     if (pages[p]._id === pageId){
            //         pages[p]=page;
            //         return pages[p];
            //     }
            // }
        }

        function deletePage(userId,websiteId,pageId) {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
            // for (var p in pages) {
            //     if (pages[p]._id === pageId) {
            //     pages.splice(p,1);
            //     return;
            //     }
            // }
        }

    }


})();
