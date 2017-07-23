/**
 * Created by Sourabh Punja on 7/22/2017.
 */
(function () {
    angular
        .module("WamApp")
        .factory("pageService",pageService);

    function pageService() {

        var pages=[
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api= {
            "findAllPagesByWebsiteId": findAllPagesByWebsiteId,
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findPageById": findPageById
        };

        return api;

        function findAllPagesByWebsiteId(websiteId){
            var pagelist=[];
            for (var p in pages){
                if (pages[p].websiteId === websiteId){
                    pagelist.push(pages[p]);
                }
            }
            return pagelist;
        }

        function findPageById(pageId){
            for (var p in pages){
                if (pages[p]._id === pageId){
                    return (pages[p]);
                }
            }
        }

        function createPage(page){
            page._id = (new Date()).getTime() + "";
            pages.push(page);
            return page;
        }

        function updatePage(pageId,page){
            for (var p in pages){
                if (pages[p]._id === pageId){
                    pages[p]=page;
                    return pages[p];
                }
            }
        }

        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                pages.splice(p,1);
                return;
                }
            }
        }

    }


})();
