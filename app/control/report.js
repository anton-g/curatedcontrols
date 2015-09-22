(function() {
    'use strict';

    angular
        .module('curatedcontrols.control')
        .controller('Report', Report);

    Report.$inject = ['$routeParams', 'dataservice', 'emailservice'];

    function Report($routeParams, dataservice, emailservice) {
        var vm = this;

        vm.send = send;
        vm.name = "";
        vm.reason = "";
        vm.comment = "";

        activate();

        function activate() {
          dataservice.getControlById($routeParams.id)
          .then(function(control) {
            vm.name = control.get('name');
          });
        }

        function send() {
          emailservice.send('Reported control: ' + vm.name, 'Reason: ' + vm.reason + '\nComment: ' + vm.comment);

          console.log (vm.name);
          console.log (vm.reason);
          console.log (vm.comment);
        }
    }
})();
