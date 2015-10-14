(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .factory('githubservice', githubservice);

    /* @ngInject */
    function githubservice($http) {
        var service = {
          getRepo: getRepo
        };

        return service;

        function getRepo(url) {
          var endpoint = repoEndpoint(url);

          return request(endpoint);
        }

        /* INTERNAL */
        function request(endpoint) {
          return $http.get('https://api.github.com/' + endpoint)
          .then(requestCompleted)
          .catch(requestFailed);

          function requestCompleted(response) {
            return response.data;
          }

          function requestFailed(error) {
            return error.message;
          }
        }

        function repoEndpoint(url) {
          var urlComponents = url.split('/');
          var user = urlComponents[urlComponents.length - 2];
          var repo = urlComponents[urlComponents.length - 1];
          return 'repos/' + user + '/' + repo;
        }
    }
})();
