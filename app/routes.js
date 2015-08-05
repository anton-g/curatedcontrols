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
    .when('/help', {
      templateUrl: 'app/help/index.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }

})();
