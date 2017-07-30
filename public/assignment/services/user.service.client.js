(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function deleteUser(userId){
            var url = "/api/user/"+userId;
            return $http.delete(url)
                .then(function (response){
                   return response.data;
                });
            // for(var u in users) {
            //     if (users[u]._id === userId) {
            //         var index = users.indexOf(users[u]);
            //         users.splice(index, 1);
            //         return;
            //     }
            // }
        }

        function updateUser(userId, user) {
            var url ="/api/user/"+userId;
            return $http.put(url,user);
            // for(var u in users) {
            //     if(users[u]._id === userId) {
            //         users[u] = user;
            //         return users[u];
            //     }
            // }
            // return null;
        }

        function registerUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
            // user._id = (new Date()).getTime() + "";
            // users.push(user);
            // return user;
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);

        }
        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
            // for(var u in users) {
            //     if(users[u]._id === userId) {
            //         return angular.copy(users[u]);
            //     }
            // }
            // return null;
        }

        function findUserByUsernameAndPassword(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
            // for(var u in users) {
            //     var _user = users[u];
            //     if(_user.username === username && _user.password === password) {
            //         return _user;
            //     }
            // }
            // return null;
        }

    }
})();