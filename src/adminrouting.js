(function(angular) {
    angular.module('graderaklubb').config(graderaAdminRouting);

    graderaAdminRouting.$inject = ["$stateProvider"];

    function graderaAdminRouting($stateProvider) {
        $stateProvider
            .state('gradingadminlist',
            {
                url: "/admin/gradinglist",
                templateUrl: "modules/grading/admin/views/gradinglist.html",
                controller: "gradingadminlist",
                controllerAs: "vm"
            })
            .state('gradingcategoryadminlist',
            {
                url: "/admin/gradingcategorylist",
                templateUrl: "modules/grading/admin/views/gradingcategoryadminlist.html",
                controller: "gradingcategoryadminlist",
                controllerAs: "vm"
            })
            .state('settingsadmin',
            {
                url: "/admin/settings/:id",
                templateUrl: "views/gradingadmin.html",
                controller: "gradingadmin"
            })
            .state('competitionsadmin',
            {
                url: "/admin/competition/:id",
                templateUrl: "views/gradingadmin.html",
                controller: "gradingadmin"
            })
            .state('listusers',
            {
                url: "/admin/listusers",
                templateUrl: "modules/core/users/admin/views/listusers.html",
                controller: "listusers"
            })
            .state('edituser',
            {
                url: "/admin/edituser/:userId",
                templateUrl: "modules/core/users/admin/views/edituser.html",
                controller: "edituser"
            })
            .state('listaccessrights',
            {
                url: "/admin/listaccessrights",
                templateUrl: "modules/core/accessrights/views/listaccessrights.html",
                controller: "listaccessrights",
                controllerAs: "vm"
            })
            .state('editaccessright',
            {
                url: "/admin/editaccessright/:id",
                templateUrl: "modules/core/accessrights/views/editaccessright.html",
                controller: "editaccessright",
                controllerAs: "vm"
            })
            .state('clubsettings',
            {
                url: "/admin/clubsettings",
                templateUrl: "modules/core/club/views/clubsettings.html",
                controller: "clubsettings",
                controllerAs: "vm"
            })
            .state('competitionadminlist',
            {
                url: "/admin/competitions",
                templateUrl: "modules/competition/admin/views/listcompetitions.html",
                controller: "competitionadminlist",
                controllerAs: "vm"
            })
            .state('editcompetition',
            {
                url: "/admin/editcompetition/:id",
                templateUrl: "modules/competition/admin/views/editcompetition.html",
                controller: "editcompetition",
                controllerAs: "vm"
            })
            .state('formsadminlist',
            {
                url: "/admin/forms",
                templateUrl: "modules/forms/admin/views/listforms.html",
                controller: "formsadminlist",
                controllerAs: "vm"
            })
            .state('formsadminedit',
            {
                url: "/admin/forms/edit/:formId",
                templateUrl: "modules/forms/admin/views/editform.html",
                controller: "formsadminedit",
                controllerAs: "vm"
            });
    }
}(window.angular));