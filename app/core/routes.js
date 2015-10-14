(function() {

  angular
      .module('curatedcontrols.core')
      .config(routeProvider);

  /* @ngInject */
  function routeProvider($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/index.html',
      })
      .when('/c/:id/:name', {
        templateUrl: 'app/control/control.html',
      })
      .when('/c/:id', {
        templateUrl: 'app/control/control.html',
      })
      .when('/tos', {
        templateUrl: 'app/tos/tos.html',
      })
      .when('/privacy', {
        templateUrl: 'app/privacy/privacy.html',
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }

})();
