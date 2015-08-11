(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .controller('SingleController', SingleController);

    SingleController.$inject = ['$routeParams', '$http', 'dataservice'];

    function SingleController($routeParams, $http, dataservice) {
        var vm = this;

        vm.control = {};

        activate();

        function activate() {
          dataservice.getControl($routeParams.id)
          .then(function(control) {
            vm.control = control;

            getGitHubInfo(vm.control.author + '/' + vm.control.name)
            .then(function(info) {
              vm.control.github = info;
              console.log (vm.control.github);
            });
          });
        }

        function getGitHubInfo(url) {
          return $http.get('https://api.github.com/repos/' + url, { cache: true })
          .then(getInfoCompleted)
          .catch(getInfoFailed);

          function getInfoCompleted(response) {
            return response.data;
          }

          function getInfoFailed(error) {
            console.log (error);
          }
        }
    }
})();
