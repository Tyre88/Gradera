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
            })
            .state('techniqueadminlist',
            {
                url: "/admin/techniques",
                templateUrl: "modules/techniques/admin/views/techniqueadminlist.html",
                controller: "techniqueadminlist",
                controllerAs: "vm"
            })
            .state('techniquetypeadminlist',
            {
                url: "/admin/technique/types",
                templateUrl: "modules/techniques/admin/views/techniquetypeadminlist.html",
                controller: "techniquetypeadminlist",
                controllerAs: "vm"
            })
            .state('techniquetypeadminedit',
            {
                url: "/admin/technique/type/:id",
                templateUrl: "modules/techniques/admin/views/techniquetypeadminedit.html",
                controller: "techniquetypeadminedit",
                controllerAs: "vm"
            })
            .state('techniqueedit',
            {
                url: "/admin/technique/:id",
                templateUrl: "modules/techniques/admin/views/techniqueedit.html",
                controller: "techniqueedit",
                controllerAs: "vm"
            }).state('gradingcategoryadminedit',
            {
                url: "/admin/gradingcategoryadminedit/:id",
                templateUrl: "modules/grading/admin/views/gradingcategoryadminedit.html",
                controller: "gradingcategoryadminedit",
                controllerAs: "vm"
            }).state('gradingadminedit',
            {
                url: "/admin/gradingadminedit/:id",
                templateUrl: "modules/grading/admin/views/gradingadminedit.html",
                controller: "gradingadminedit",
                controllerAs: "vm"
            }).state('editbooklet',
            {
                url: "/admin/booklet/edit/:id",
                templateUrl: "modules/grading/admin/views/bookletadminedit.html",
                controller: "editbookletController",
                controllerAs: "vm"
            }).state('newsletteradminlist',
            {
                url: "/admin/newsletters",
                templateUrl: "modules/newsletter/admin/views/newsletterlist.html",
                controller: "newsletter.admin.list",
                controllerAs: "vm"
            }).state('newsletteradminedit',
            {
                url: "/admin/newsletters/edit/:id",
                templateUrl: "modules/newsletter/admin/views/newsletteredit.html",
                controller: "newsletter.admin.edit",
                controllerAs: "vm"
            }).state('newsletteradminstats',
            {
                url: "/admin/newsletters/stats/:id",
                templateUrl: "modules/newsletter/admin/views/newsletterstats.html",
                controller: "newsletter.admin.stats",
                controllerAs: "vm"
            });
    }
}(window.angular));