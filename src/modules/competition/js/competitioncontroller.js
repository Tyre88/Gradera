(function(angular) {
    angular.module('graderaklubb').controller('competitionlist', competitionlistController);
    angular.module('graderaklubb').controller('showcompetition', showcompetitionController);

    competitionlistController.$inject = ["competition-service", "$state"];
    showcompetitionController.$inject = ["competition-service", "$state", "$stateParams", "user-service"];

    function competitionlistController(competitionService, $state) {
        var vm = this;
        vm.Competitions = [];

        vm.GetCompetitions = GetCompeitions;
        vm.ShowCompetition = ShowCompetition;

        function GetCompeitions() {
            competitionService.GetCompetitions().then(getCompetitionsCallback);

            function getCompetitionsCallback(response) {
                vm.Competitions = response.data;

                for(var i = 0; i < vm.Competitions.length; i++)
                {
                    vm.Competitions[i].Location = JSON.parse(vm.Competitions[i].Location);
                }
            }
        }

        function ShowCompetition(competitionId) {
            $state.go('showcompetition', {id: competitionId});
        }

        vm.GetCompetitions();
    }

    function showcompetitionController(competitionService, $state, $stateParams, userService) {
        var vm = this;

        vm.Competition = {};
        vm.CompetitionId = ~~$stateParams.id;
        vm.SelectedCategory = 0;

        vm.GetCompetition = GetCompetition;
        vm.Back = Back;
        vm.Signup = Signup;
        vm.IsActive = IsActive;

        function GetCompetition() {
            competitionService.GetCompetition(vm.CompetitionId).then(getCompetitionCallback);

            function getCompetitionCallback(response) {
                vm.Competition = response.data;
                vm.Competition.Location = JSON.parse(vm.Competition.Location);
                vm.Competition.StartDate = new Date(vm.Competition.StartDate);
                vm.Competition.EndDate = new Date(vm.Competition.EndDate);
                vm.Competition.StartSignupDate = new Date(vm.Competition.StartSignupDate);
                vm.Competition.EndSignupDate = new Date(vm.Competition.EndSignupDate);
            }
        }

        function Back() {
            $state.go('competitionlist');
        }

        function Signup() {
            competitionService.SubscribeToCompetition(vm.CompetitionId, vm.SelectedCategory).then(signupCallback);

            function signupCallback(response) {
                vm.Competition.Compeditors.push({Id: -1, FirstName: userService.User.FirstName, LastName: userService.User.LastName,
                    Category: {
                        Name: vm.Competition.Categories.GetItemByValue("Id", vm.SelectedCategory).Name
                    },
                    Image: userService.User.Image});
            }
        }

        function IsActive() {
            var now = new Date();
            return vm.Competition.StartSignupDate < now && vm.Competition.EndSignupDate > now;
        }

        if(vm.CompetitionId > 0)
            vm.GetCompetition();
    }
}(window.angular));