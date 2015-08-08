(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .controller('ControlController', ControlController);

    ControlController.$inject = ['$scope', 'dataservice', 'settingsservice'];

    function ControlController($scope, dataservice, settingsservice) {
        var vm = this;

        vm.controls = {};
        vm.msg = "Loading..";
        vm.styleList = false;
        vm.itemsPerPage = 2;

        vm.tags = tags;

        activate();

        function activate() {
          dataservice.getControls()
          .then(function(result) {
            vm.controls = result;

            vm.msg = "No controls found :(";

            vm.controls.forEach(function(value) {
              settingsservice.add(value.tags);
            });
          });

          $scope.$watch(function(){
            return settingsservice.styleList;
          }, function (newValue) {
            vm.styleList = newValue;
          });
        }

        function tags(control) {
          var result = true;
          settingsservice.selectedTags.forEach(function(tag) {
            if (control.tags.indexOf(tag) < 0) {
              result = false;
            }
          });
          return result;
        }
    }
})();
