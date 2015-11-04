var require = 
    {
        paths:
        {
            "angular-route": "dependencies/angular-route/angular-route.min",
            "angular-animate":"dependencies/angular-animate/angular-animate.min",
            "angular-aria":"dependencies/angular-aria/angular-aria.min",
            "angular-material":"dependencies/angular-material/angular-material",
            "angular-dragdrop": "dependencies/angular-drag-and-drop/angular-drag-and-drop",
            "ui-router": "dependencies/angular-ui-router/release/angular-ui-router.min",
            "app": "app",
            "appexternal": "appexternal",
            "domready": "dependencies/require/domready",
            "ui-bootstrap": "dependencies/ui-bootstrap-tpls-0.11.0.min",
            "jquery": "dependencies/jquery/jquery.min",
            "jquery-ui": "dependencies/jquery/jquery-ui",
			"extensions": "dependencies/extensions",
            "webbdudes-image-helper": "dependencies/webbdudes/webbdudes-image-helper",
            "ng-file-upload": "dependencies/ng-file-upload/ng-file-upload.min",
            "angular-formly": "dependencies/angular-formly/dist/formly",
            "api-check": "dependencies/api-check/dist/api-check.min"
        },
        shim:
        {
            "app":
            {
                deps: ["ui-router", "ui-bootstrap", "angular-material", "angular-route", "angular-dragdrop", "webbdudes-image-helper", "ng-file-upload"]
            },
            "appexternal":
            {
                deps: ["ui-router", "ui-bootstrap", "angular-material", "angular-route"]
            },
            "angular-material":
            {
                deps: ["angular-animate", "angular-aria"]
            },
            "angular-formly":
            {
                deps: ["api-check"]
            }
        },
        deps:
        [
			"extensions",
            "domready"
        ]
    };