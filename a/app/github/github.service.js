(function() {
    'use strict';

    angular
        .module('curatedcontrols.admin')
        .service('GitHubService', GitHubService);

    GitHubService.$inject = ['$http'];

    function GitHubService($http) {
        var service = this;

        service.github = null;

        service.fetch = fetch;

        function fetch(url) {
          var apiURL = transformURL(url);

          return $http.get(apiURL)
          .then(fetchCompleted)
          .catch(fetchFailed);

          function fetchCompleted(response) {
            console.log (response.data);
            service.github = response.data;
            return service.github;
          }

          function fetchFailed(error) {
            console.log ('error');
            console.log (error);
          }
        }

        function transformURL(url) {
          //Transform URL to API friendly URL:
          var splittedURL = url.split('/');
          var fixedURL = 'https://api.github.com/repos/' + splittedURL[splittedURL.length - 2] + '/' + splittedURL[splittedURL.length - 1];
          return fixedURL;
        }
    }
})();
