LoadCss(["content/css/external.css", "content/css/externaldependencies.css"]);
(function(angular) {
    angular.module("graderaklubbexternal", ['ng', 'ngRoute', 'ui.router', 'ngMaterial', 'angular-loading-bar', 'ngMessages', 'formly', 'ngSanitize', 'btford.markdown', 'ngFileUpload']);
    angular.module("graderaklubbexternal").controller('home', homeController);

    angular.module("graderaklubbexternal").config(externalConfig);
    angular.module("graderaklubbexternal").run(externalRun);

    homeController.$inject = [];
    externalConfig.$inject = ["cfpLoadingBarProvider"];
    externalRun.$inject = ["$rootScope", "formlyConfig", "Upload"];

    function homeController() {
        var vm = this;
    }

    function externalConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 250;
        cfpLoadingBarProvider.spinnerTemplate = '<div class="loader md-whiteframe-z1">Laddar...</div>';
    }

    function externalRun($rootScope, formlyConfig, Upload) {
        $rootScope.UploadImage = function(file, successCallback) {
            Upload.upload({
                url: "/api/file/UploadFilePublic",
                data: {file: file}
            }).then(successCallback, function(err) {
                console.error(err);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ');
            });
        };

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

        formlyConfig.setType({
            name: 'upload',
            extends: 'input',
            link: function(scope, el, attrs) {
                el.on("change", function(changeEvent) {
                    var file = changeEvent.target.files[0];
                    if (file) {
                        console.log('scope.id', scope.id);
                        var fd = new FormData();
                        // use key on backEnd
                        fd.append('uploadFile', file);
                        scope.$emit('fileToUpload', fd);
                        var fileProp = {};
                        $rootScope.UploadImage(file, function(response) {
                           file.newName = response.data;

                            for (var properties in file) {
                                if (!angular.isFunction(file[properties])) {
                                    fileProp[properties] = file[properties];
                                }
                            }
                            scope.fc.$setViewValue(fileProp);

                        });
                        for (var properties in file) {
                            if (!angular.isFunction(file[properties])) {
                                fileProp[properties] = file[properties];
                            }
                        }
                        scope.fc.$setViewValue(fileProp);
                    } else {
                        scope.fc.$setViewValue(undefined);
                    }
                });
                el.on("focusout", function(focusoutEvent) {
                    // dont run validation , user still opening pop up file dialog
                    if ($window.document.activeElement.id === scope.id) {
                        // so we set it untouched
                        scope.$apply(function(scope) {
                            scope.fc.$setUntouched();
                        });
                    } else {
                        // element losing focus so we trigger validation
                        scope.fc.$validate();
                    }
                });

            },
            defaultOptions: {
                templateOptions: {
                    type: 'file',
                    required: true
                }
            }
        });

        formlyConfig.setWrapper({
            name: 'upload',
            types: ['upload'],
            template: '<div><span>{{to.label}}: </span><formly-transclude></formly-transclude></div>'
        });
    }

    $(document).ready(function () {
        angular.bootstrap(document, ["graderaklubbexternal"]);
    });
}(window.angular));