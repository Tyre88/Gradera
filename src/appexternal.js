/**
 * Created by Victor on 2015-11-04.
 */

'use-strict';

define(
    [
        "ui-router",
        "ui-bootstrap"
    ],
    function () {
        try
        {
            return angular.module("graderaklubbexternal");
        }
        catch(err)
        {
            function homeController() {
                var vm = this;
                vm.Test = "Hello world";
                console.log("testing....");
            }

            return angular.module("graderaklubbexternal", ['ng', 'ngRoute', 'ui.router', 'ui.bootstrap', 'ngMaterial'])
                .controller('home', homeController);
        }
    });