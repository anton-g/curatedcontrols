(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .directive('tipsModal', tipsModal);

    function tipsModal() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/tips/index.html',
            controller: TipsController,
            controllerAs: 'tipsCtrl',
        };

        return directive;
    }

    TipsController.$inject = [];

    function TipsController() {
        var vm = this;

        vm.send = send;

        activate();

        function activate() {

        }

        function send() {
          console.log ('oh hai');
        }
    }
})();
