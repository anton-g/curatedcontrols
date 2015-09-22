(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .factory('emailservice', emailservice);

    emailservice.$inject = [];

    function emailservice() {
        var service = {
            send: send
        };

        return service;

        function send(title, body) {
          console.log ('SENDING EMAIL TO ' + title + ' WITH BODY ' + body);
          console.log ('not');
        }
    }
})();
