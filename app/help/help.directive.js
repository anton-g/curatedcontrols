(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .directive('helpModal', helpModal);

    function helpModal() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/help/index.html',
        };

        return directive;
    }
})();
