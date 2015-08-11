(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .directive('reportModal', reportModal);

    function reportModal() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/control/single-control/report.html',
            controller: ReportController,
            controllerAs: 'reportCtrl'
        };

        return directive;
    }

    ReportController.$inject = [];

    function ReportController() {
        var vm = this;

        vm.send = send;

        activate();

        function activate() {
          $("select").select2();
        }

        function send(control) {
          console.log (control);
        }
    }
})();
