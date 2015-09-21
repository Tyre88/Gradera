require(
	[
		"app",
		"services/belt-service.js"
	],
	function(app)
	{
		app.directive('gkGradingCategory', ["belt-service", function(beltService)
		{
			return {
				restrict: "E",
				transclude: true,
				templateUrl: "directives/views/grading-category.html",
				scope:
				{
					ngModel: "=",
					adminMode: "=",
					beltColor: "="
				},
				link: function(scope)
				{
					scope.DeleteItem = function(item)
					{
						scope.ngModel.RemoveItem(item);
					};

					scope.GetClass = function()
					{
						switch(scope.beltColor)
						{
							case beltService.BeltColor.WhiteYellow:
								return "grading-category-white-yellow";
							case beltService.BeltColor.Yellow:
								return "grading-category-yellow";
						}
					};

					scope.$watch('ngModel', function() {
						if(scope.ngModel === undefined)
							scope.ngModel = [];
					});
				}
			};
		}]);
	}
);