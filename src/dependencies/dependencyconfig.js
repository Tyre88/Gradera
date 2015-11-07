var require = 
    {
        paths:
        {
            "angular-route": "dependencies/angular-route/angular-route.min",
            "angular-animate":"dependencies/angular-animate/angular-animate.min",
            "angular-aria":"dependencies/angular-aria/angular-aria.min",
            "angular-material":"dependencies/angular-material/angular-material",
            "ui-router": "dependencies/angular-ui-router/release/angular-ui-router.min",
            "app": "app",
            "domready": "dependencies/require/domready",
            "jquery": "dependencies/jquery/jquery.min",
            "jquery-ui": "dependencies/jquery/jquery-ui",
			"extensions": "dependencies/extensions",
            "webbdudes-image-helper": "dependencies/webbdudes/webbdudes-image-helper",
            "ng-file-upload": "dependencies/ng-file-upload/ng-file-upload.min",
            "angular-formly": "dependencies/angular-formly/dist/formly"
        },
        shim:
        {
            "app":
            {
                deps: ["ui-router", "angular-material", "angular-route", "webbdudes-image-helper", "ng-file-upload", "angular-formly"]
            },
            "angular-material":
            {
                deps: ["angular-animate", "angular-aria"]
            }
        },
        deps:
        [
			"extensions",
            "domready"
        ]
    };