/**
 * Created by Victor on 2015-11-04.
 */

'use-strict';

require(
    [
        "appexternal",
        "./externalrouting.js",
        "modules/competition/external/js/competitioncontroller.js"
    ],
    function () {
        require(["domready!"], function(document)
        {
            return angular.bootstrap(document, ["graderaklubbexternal"]);
        });
    });