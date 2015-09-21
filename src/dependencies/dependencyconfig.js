var require = 
    {
        paths:
        {
            "angular": "dependencies/angular/angular.min",
            "angular-route": "dependencies/angular-route/angular-route.min",
            "angular-animate":"dependencies/angular-animate/angular-animate.min",
            "angular-aria":"dependencies/angular-aria/angular-aria.min",
            "angular-material":"dependencies/angular-material/angular-material",
            "angular-dragdrop": "dependencies/angular-plugins/angular-dragdrop",
            "ui-router": "dependencies/angular-ui-router/release/angular-ui-router.min",
            "app": "app",
            "domready": "dependencies/require/domready",
            "ui-bootstrap": "dependencies/ui-bootstrap-tpls-0.11.0.min",
            "jquery": "dependencies/jquery/jquery.min",
            "jquery-ui": "dependencies/jquery/jquery-ui",
			"extensions": "dependencies/extensions"
        },
        shim:
        {
            "app":
            {
                deps: ["ui-router", "ui-bootstrap", "angular-material", "angular-route"]
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