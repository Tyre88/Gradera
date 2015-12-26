(function(angular) {
    angular.module('graderaklubb').config(graderaRouting);

    graderaRouting.$inject = ["$stateProvider", "$urlRouterProvider"];

    function graderaRouting($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login',
            {
                url: "/login",
                templateUrl: "views/home.html",
                controller: "home"
            })
            .state('clublogin',
            {
                url: "/login/:clubShortName",
                templateUrl: "modules/core/authenticate/views/clublogin.html",
                controller: "clublogin",
                controllerAs: "vm"
            })
            .state('logout',
            {
                url: "/logout",
                template: "",
                controller: "logoutController"
            })
            .state('noaccess',
            {
                url: "/noaccess",
                template: "<p>Access denied!</p>",
                controller: "noaccessController"
            })
            .state('home',
            {
                url: "/",
                templateUrl: "modules/home/views/home.html",
                controller: "home",
                controllerAs: "vm"
            })
            .state('competitionlist',
            {
                url: "/competitions",
                templateUrl: "modules/competition/views/listcompetitions.html",
                controller: "competitionlist",
                controllerAs: "vm"
            })
            .state('showcompetition',
            {
                url: "/competition/:id",
                templateUrl: "modules/competition/views/showcompetition.html",
                controller: "showcompetition",
                controllerAs: "vm"
            })
            .state('userlist',
            {
                url: "/users",
                templateUrl: "modules/core/users/views/listusers.html",
                controller: "userlist",
                controllerAs: "vm"
            })
            .state('showuser',
            {
                url: "/user/:userId",
                templateUrl: "modules/core/users/views/showuser.html",
                controller: "showuser",
                controllerAs: "vm"
            })
            .state('showform',{
                url: "/form/:formId",
                templateUrl: "modules/forms/views/showform.html",
                controller: "showform",
                controllerAs: "vm"
            })
            .state('formanswers',
            {
                url: "/form/answers/:formId",
                templateUrl: "modules/forms/admin/views/formanswers.html",
                controller: "formanswers",
                controllerAs: "vm"
            })
            .state('formanswersexternal',
            {
                url: "/form/answersexternal/:formId",
                templateUrl: "modules/forms/admin/views/formanswersexternal.html",
                controller: "formanswersexternal",
                controllerAs: "vm"
            }).state('gradinglist',
            {
                url: "/grading",
                templateUrl: "modules/grading/views/gradinglist.html",
                controller: "gradinglist",
                controllerAs: "vm"
            }).state('showgrade',
            {
                url: "/grading/show/:gradeId",
                templateUrl: "modules/grading/views/showgrade.html",
                controller: "showgrade",
                controllerAs: "vm"
            }).state('showtechnique',
            {
                url: "/technique/show/:id",
                templateUrl: "modules/techniques/views/showtechnique.html",
                controller: "showtechnique",
                controllerAs: "vm"
            }).state('showbooklet',
            {
                url: "/grading/showbooklet/:id",
                templateUrl: "modules/grading/views/showbooklet.html",
                controller: "showbookletController",
                controllerAs: "vm"
            }).state('listbooklets',
            {
                url: "/booklets",
                templateUrl: "modules/grading/views/listbooklets.html",
                controller: "listbookletsController",
                controllerAs: "vm"
            });

        $urlRouterProvider.otherwise('/login');
    }
}(window.angular));