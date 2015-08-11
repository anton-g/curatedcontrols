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
        vm.itemsPerPage = 10;

        vm.tags = tags;
        vm.isNew = isNew;
        vm.dateSort = dateSort;

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

        function isNew(control) {
          var ctrlDate = new Date(control.createdAt);
          var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));

          return (ctrlDate > yesterday);
        }

        function dateSort(control) {
          return new Date(control.createdAt);
        }
    }
})();
