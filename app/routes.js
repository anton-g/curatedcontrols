(function() {

  angular
      .module('curatedcontrols')
      .config(routeProvider);

  function routeProvider($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'app/index.html',
    })
    .when('/c/:id/:name', {
      templateUrl: 'app/control/single-control/index.html',
    })
    .when('/c/:id', {
      templateUrl: 'app/control/single-control/index.html',
    })
    .when('/tos', {
      templateUrl: 'app/tos/index.html',
    })
    .when('/privacy', {
      templateUrl: 'app/privacy/index.html',
    })
    .otherwise({
      redirectTo: '/'
    });
  }

})();
