(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q'];

    function dataservice($http, $q) {
      var service = {
        getControls: getControls,
      };

      var controls = [];

      return service;

      function getControls() {
        $http.defaults.headers.get = {
          'X-Parse-Application-Id' : 'j9xiw2SW5WIg3GcFe5L3mJeIX61zKiXqKwdDcwlG',
          'X-Parse-REST-API-Key': 'U7Z83FdFHLo9ViIyzg3vMH3Rm7AIqGe9fxgKug4b'
        };

        return $http.get('https://api.parse.com/1/classes/control')
        .then(getControlsCompleted)
        .catch(getControlsFailed);

        function getControlsCompleted(response) {
          return response.data.results;
        }

        function getControlsFailed(error) {
          console.log (error);
        }
      }
    }
})();
