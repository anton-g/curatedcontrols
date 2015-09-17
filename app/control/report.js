(function() {
    'use strict';

    angular
        .module('curatedcontrols.control')
        .controller('Report', Report);

    Report.$inject = [];

    function Report() {
        var vm = this;

        vm.send = send;

        activate();

        function activate() {

        }

        function send() {
          console.log ('SEND');
        }
    }
})();
