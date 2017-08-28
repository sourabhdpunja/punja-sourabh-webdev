(function () {

    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve:{
                    userobject: checkCurrentUser
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                // controller: "adminController",
                // controllerAs: "model",
                resolve:{
                    userobject: checkAdmin
                }
            })
            .when("/admin/users", {
                templateUrl: "views/admin/templates/admin-users.view.client.html",
                controller: "adminUsersController",
                controllerAs: "model",
                resolve:{
                    userobject: checkAdmin
                }
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            // website routes
            .when("/user/:userId/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page",{
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page/new",{
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId",{
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget",{
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new",{
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "WidgetNewController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId",{
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/search",{
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "FlickrController",
                controllerAs: "model",
                resolve:{
                    userobject: checkLoggedIn
                }
            })
    }

    function checkAdmin($q,$location,userService){
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (response){
                var currentUser = response;
                if (currentUser === "0"){
                    deferred.resolve({});
                    $location.url('/');
                }else{
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedIn($q,$location,userService){
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (response){
                var currentUser = response;
                if (currentUser === "0"){
                    deferred.reject();
                    $location.url('/login');
                }else{
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkCurrentUser($q,$location,userService){
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (response){
                var currentUser = response;
                if (currentUser === "0"){
                    deferred.resolve({});
                }else{
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;

    }
})();