(function (angular) {
    angular.module('graderaklubb').filter('startFrom', startFromFilter);

    startFromFilter.$inject = ["$filter"];

    function startFromFilter($filter) {
        return function(input, pagingObject) {

            if(pagingObject.Filter && pagingObject.Filter !== "") {
                input = $filter('filter')(input, pagingObject.Filter);
                return input.slice(0, pagingObject.PageSize);
            }

            +pagingObject.Page--;
            var start = +(pagingObject.Page * pagingObject.PageSize);
            return input.slice(start, start + pagingObject.PageSize);
        }
    }
}(window.angular));