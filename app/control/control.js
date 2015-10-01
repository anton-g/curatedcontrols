(function() {
    'use strict';

    angular
        .module('curatedcontrols.control')
        .controller('Control', Control);

    
    /* @ngInject */
    function Control($routeParams, dataservice, githubservice) {
        var vm = this;

        vm.control = {};
        vm.images = [];
        vm.github = {};

        activate();

        function activate() {
          dataservice.getControlById($routeParams.id)
          .then(function(control) {
            vm.control = control;

            setImages();

            githubservice.getRepo(control.get('link'))
            .then(function(data) {
              vm.github = data;
            });
          });
        }

        function setImages() {
          var previews = vm.control.get('previews');
          var gifs = vm.control.get('images');

          vm.images = gifs.concat(previews);
        }
    }
})();
