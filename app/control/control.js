(function() {
    'use strict';

    angular
        .module('curatedcontrols.control')
        .controller('Control', Control);

    Control.$inject = ['$routeParams', 'dataservice', 'githubservice'];

    function Control($routeParams, dataservice, githubservice) {
        var vm = this;

        vm.control = {};
        vm.github = {};

        activate();

        function activate() {
          dataservice.getControlById($routeParams.id)
          .then(function(control) {
            vm.control = control;

            githubservice.getRepo(control.get('link'))
            .then(function(data) {
              vm.github = data;
            });
          });
        }
    }
})();
