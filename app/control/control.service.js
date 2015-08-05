(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q'];

    function dataservice($http, $q) {
      var service = {
        getControls: getControls,
        getControl: getControl
      };

      var controls = [];

      activate();
      return service;

      function activate() {
        $http.defaults.headers.get = {
          'X-Parse-Application-Id' : 'j9xiw2SW5WIg3GcFe5L3mJeIX61zKiXqKwdDcwlG',
          'X-Parse-REST-API-Key': 'U7Z83FdFHLo9ViIyzg3vMH3Rm7AIqGe9fxgKug4b'
        };
      }

      function getControls() {
        return $http.get('https://api.parse.com/1/classes/control', { cache: true })
        .then(getControlsCompleted)
        .catch(getControlsFailed);

        function getControlsCompleted(response) {
          controls = response.data.results;
          return controls;
        }

        function getControlsFailed(error) {
          console.log (error);
        }
      }

      function getControl(id) {
        //If control is loaded already, i.e. user comes from list
        var controlPromise = $q.defer();
        var found = controls.filter(function(c) {
          return c.objectId == id;
        });
        if (found[0]) {
          console.log (found[0]);
          controlPromise.resolve(found[0]);
          return controlPromise.promise;
        }

        //Otherwise load single control, i.e. user followed link to single contorl
        return $http.get('https://api.parse.com/1/classes/control/' + id, { cache: true })
        .then(getControlCompleted)
        .catch(getControlFailed);

        function getControlCompleted(response) {
          return response.data;
        }

        function getControlFailed(error) {
          console.log (error);
        }
      }
    }
})();
