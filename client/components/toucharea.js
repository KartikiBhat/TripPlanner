angular.module('app')
.directive('toucharea', ['$touch', function($touch) {
    // Runs during compile
    return {
      restrict: 'C',
      scope: {
          trail: "="
      },
      link: function($scope, elem) {
        
        $touch.bind(elem, {
          end: function(touch) {
            $scope.trail.select = !$scope.trail.select;
            $scope.$apply();
          }
        });
      }
    };
  }]);
  