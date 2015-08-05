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
    .otherwise({
      redirectTo: '/'
    });
  }

})();
