/**
 * Created by Victor on 2015-11-07.
 */

'use-strict';

require(
    [
        "app"
    ],
    function (app) {
        app.directive('ngEnter', enterDirective);

        function enterDirective() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if(event.which === 13) {
                        scope.$apply(function(){
                            scope.$eval(attrs.ngEnter, {'event': event});
                        });

                        event.preventDefault();
                    }
                });
            };
        }
    });