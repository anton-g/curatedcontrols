(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .controller('SingleController', SingleController);

    SingleController.$inject = ['$routeParams', 'dataservice'];

    function SingleController($routeParams, dataservice) {
        var vm = this;

        vm.control = {};

        activate();

        function activate() {
          dataservice.getControl($routeParams.id)
          .then(function(control) {
            vm.control = control;
          });
        }
    }
})();
