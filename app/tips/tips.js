(function() {
    'use strict';

    angular
        .module('curatedcontrols.tips')
        .controller('Tips', Tips);

    Tips.$inject = [];

    function Tips() {
        var vm = this;

        vm.send = send;

        activate();

        function activate() {

        }

        function send() {
          console.log('send tip');
        }
    }
})();
