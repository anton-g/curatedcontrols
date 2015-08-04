(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .controller('ControlController', ControlController);

    ControlController.$inject = ['dataservice', 'tagservice'];

    function ControlController(dataservice, tagservice) {
        var vm = this;

        vm.controls = {};

        vm.tags = tags,
        vm.selectedTags = [];

        activate();

        function activate() {
          dataservice.getControls()
          .then(function(result) {
            vm.controls = result;

            vm.controls.forEach(function(value) {
              tagservice.add(value.tags);
            });
          });
        }

        function tags(control) {
          var result = true;
          vm.selectedTags.forEach(function(tag) {
            if (control.tags.indexOf(tag) < 0) {
              result = false;
            }
          });
          return result;
        }
    }
})();
