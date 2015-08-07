(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .controller('ControlController', ControlController);

    ControlController.$inject = ['dataservice', 'settingsservice'];

    function ControlController(dataservice, settingsservice) {
        var vm = this;

        vm.controls = {};
        vm.msg = "Loading..";
        vm.list = false;

        vm.tags = tags;
        vm.showGrid = showGrid;
        vm.showList = showList;

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

        function showGrid() {
          vm.list = false;
        }

        function showList() {
          vm.list = true;
        }
    }
})();
