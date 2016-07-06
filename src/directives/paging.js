(function (angular) {
    var pagingOptions = {
        bindings: {
            totalSize: '<',
            pageSize: '<',
            currentPage: '=',
            limitTo: '<'
        },
        controller: pagingController,
        templateUrl: "directives/views/paging.html",
        controllerAs: "vm"
    };

    angular.module('graderaklubb').component('gkPaging', pagingOptions);

    pagingController.$inject = ["pagingValues"];

    function pagingController(pagingValues) {
        var vm = this;
        vm.pages = [];

        vm.ChangePage = ChangePage;
        vm.GetStartIndex = GetStartIndex;

        function ChangePage(page) {
            vm.currentPage = page;
            $("md-content").animate({ scrollTop: 0 }, 'slow');
        }

        function GetStartIndex() {
            if(vm.currentPage <= vm.halfLimitTo) return 0;

            return vm.currentPage - vm.halfLimitTo;
        }

        function calculateTotalPages() {
            vm.totalPages = vm.totalSize / vm.pageSize;
            if(vm.totalSize % vm.pageSize > 0)
                vm.totalPages++;

            vm.totalPages = parseInt(vm.totalPages);
            vm.pages = [];
            for(var i = 0; i < vm.totalPages; i++) {
                vm.pages.push(i + 1);
            }
        }

        this.$onChanges = function (changesObj) {
            if (changesObj.totalSize) {
                calculateTotalPages();
            }
        };

        if(vm.pageSize === undefined || vm.pageSize <= 0)
            vm.pageSize = pagingValues.PageSize;

        if(vm.limitTo === undefined || vm.limitTo <= 0)
            vm.limitTo = 5;

        vm.halfLimitTo = parseInt((vm.limitTo / 2) + (vm.limitTo % 2));
    }
}(window.angular));