(function() {
    'use strict';

    angular
        .module('curatedcontrols.admin')
        .controller('GitHubController', GitHubController);

    GitHubController.$inject = ['$sce', '$scope', '$http', 'GitHubService'];

    function GitHubController($sce, $scope, $http, GitHubService) {
        var vm = this;

        vm.gh = {};
        vm.license = "Loading license..";
        vm.readme = "Loading readme..";

        activate();

        function activate() {
          $scope.$watch(function(){
            return GitHubService.github;
          }, function (newValue) {
            vm.gh = newValue;

            license(vm.gh.contents_url);
            readme(vm.gh.contents_url, 'README.md');
          });
        }

        function license(contentsURL) {
          var realURL = contentsURL.split('{')[0];
          $http.get(realURL + 'LICENSE')
          .then(function(response) {
            $http.get(response.data.download_url)
            .then(function(response) {
              vm.license = response.data;
            });
          });
        }

        function readme(contentsURL, file) {
          var realURL = contentsURL.split('{')[0];
          //Check if license file exists
          $http.get(realURL + file)
          .then(function(result) {
            $http.get(result.data.download_url)
            .then(function(result) {
              vm.readme = $sce.trustAsHtml(markdown.toHTML(result.data));
            });
          })
          .catch(function(error) {
            if (file == 'README.mdown')
              return;

            readme(contentsURL, 'README.mdown');
          });
        }
    }
})();
