LoadCss(["content/css/external.css"]);
(function(angular) {
    angular.module("graderaklubbexternal", ['ng', 'ngRoute', 'ui.router', 'ngMaterial', 'angular-loading-bar', 'ngMessages', 'formly'])
        .controller('home', homeController);

    angular.module("graderaklubbexternal").config(externalConfig);
    angular.module("graderaklubbexternal").run(externalRun);

    externalConfig.$inject = ["cfpLoadingBarProvider"];
    externalRun.$inject = ["formlyConfig"];

    function homeController() {
        var vm = this;
        vm.Test = "Hello world";
        console.log("LALA");
    }

    function externalConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 250;
        cfpLoadingBarProvider.spinnerTemplate = '<div class="loader md-whiteframe-z1">Laddar...</div>';
    }

    function externalRun(formlyConfig) {
        formlyConfig.setType({
            name: 'select',
            template: '<md-input-container><label>{{model[options.templateOptions.label]}}</label><md-select placeholder="{{to.label}}" ng-model="model[options.key]"><md-option ng-repeat="option in this.options.templateOptions.options" value="{{option.name}}">{{option.name}}</md-option></md-select></md-input-container>'
        });

        formlyConfig.setType({
            name: 'textarea',
            template: '<textarea ng-model="model[options.key]" columns="3" md-maxlength="500"></textarea>'
        });

        formlyConfig.setType({
            name: 'input',
            template: '<input ng-model="model[options.key]">'
        });

        formlyConfig.setType({
            name: 'checkbox',
            template: '<md-checkbox ng-model="model[options.key]">{{to.label}}</md-checkbox>'
        });

        formlyConfig.setWrapper({
            name: 'mdLabel',
            types: ['input', 'textarea'],
            template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
        });

        formlyConfig.setWrapper({
            name: 'mdInputContainer',
            types: ['input', 'textarea'],
            template: '<md-input-container><formly-transclude></formly-transclude></md-input-container>'
        });
    }

    $(document).ready(function () {
        angular.bootstrap(document, ["graderaklubbexternal"]);
    });
}(window.angular));