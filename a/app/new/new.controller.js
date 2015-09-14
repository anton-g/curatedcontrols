(function() {
    'use strict';

    angular
        .module('curatedcontrols.admin')
        .controller('NewController', NewController);

    NewController.$inject = ['$scope', 'GitHubService', 'DataService'];

    function NewController($scope, GitHubService, DataService) {
        var vm = this;

        vm.fetch = fetch;
        vm.send = send;
        vm.selectTag = selectTag;

        //Core data
        vm.licenses = [];
        vm.languages = [];
        vm.allTags = [];
        vm.allAuthors = [];

        //Adding
        vm.controlLink = "";
        vm.controlName = "";
        vm.controlDesc = "";
        vm.controlLicense = "MIT";
        vm.controlAuthor = "";
        vm.controlLang = "Objective-C";
        vm.controlImgs = [];
        vm.controlTags = [];

        //Parse.com setup
        Parse.initialize("j9xiw2SW5WIg3GcFe5L3mJeIX61zKiXqKwdDcwlG", "7e5DCt2qGeJsyOCz01ANCj5BMmxe13PCBbfRj7yh");
        var Control = Parse.Object.extend('control');
        var Author = Parse.Object.extend('author');
        var Tag = Parse.Object.extend('tag');
        var License = Parse.Object.extend('license');

        activate();

        function activate() {
          $('input.tagsinput').tagsinput({
            itemText: function(item) {
              return item.get('name');
            },
            itemValue: function(item) {
              return item.get('id');
            }
          });

          $scope.$watch(function(){
            return GitHubService.github;
          }, function (result) {
            var names = result.full_name.split('/');

            vm.controlName = names[1];
            vm.controlDesc = result.description;
            vm.controlAuthor = names[0];
            vm.controlLang = result.language;
            vm.controlLicense = guessLicense
          });

          DataService.getControls()
          .then(function(results) {

          });

          DataService.getTags()
          .then(function(results) {
            vm.allTags = results;
          });

          DataService.getAuthors()
          .then(function(results) {
            vm.allAuthors = results;
          });

          DataService.getLicenses()
          .then(function(results) {
            vm.licenses = results;
          });

          DataService.getLanguages()
          .then(function(results) {
            vm.languages = results;
          });
        }

        function getExistingAuthor() {
          for (var i = 0; i < vm.allAuthors.length; i++) {
            vm.allAuthors[i]
            if (vm.allAuthors[i].get('name') == vm.controlAuthor) {
              return vm.allAuthors[i];
            }
          }
          return false;
        }

        function send() {
          uploadImages(vm.controlName).then(function(img1,img2,img3,img4,img5, img6, img7, img8, img9, img10) {
            var rawimgs = [img1,img2,img3,img4,img5, img6, img7, img8, img9, img10];
            var imgs = [];
            for (var i = 0; i < rawimgs.length; i++) {
              if (rawimgs[i])
                imgs.push(rawimgs[i]);
            }

            // BEWARE FULKOD BELOW ಠ_ಠ
            var lang = "";
            for (var i = 0; i < vm.languages.length; i++) {
              if (vm.languages[i].get('name') == vm.controlLang) {
                lang = vm.languages[i];
              }
            }

            var license = "";
            for (var i = 0; i < vm.licenses.length; i++) {
              if (vm.licenses[i].get('name') == vm.controlLicense) {
                license = vm.licenses[i];
              }
            }

            var author = getExistingAuthor();
            if (!author) {
              author = new Author();
              author.set('name', vm.controlAuthor)
            }

            var control = new Control();

            var tagRelation = control.relation('tags');
            for (var i = 0; i < vm.controlTags.length; i++) {
              tagRelation.add(vm.controlTags[i]);
            }

            var data = {
              name: vm.controlName,
              description: vm.controlDesc,
              author: author,
              language: lang,
              license: license,
              link: vm.controlLink,
              images: imgs
            };

            control.save(data, {
              success: function(data) {

              },
              error: function(data, error) {
                $('.error').html(error.message);
              }
            });
          });
        }

        function fetch(url) {
          GitHubService.fetch(url)
          .then(function(results) {
            vm.controlLink = url;
            vm.controlLang = results.language;
          });
        }

        function guessLicense(license) {
          var index = license.indexOf("The MIT License");
          if (index > -1) {
            return "MIT";
          }

          return "Unknown";
        }

        function selectTag(tag) {
          vm.controlTags.push(tag);
          console.log (vm.controlTags);

          $('#tags').tagsinput('add', tag);
        }

        function uploadImages(control) {
          var fileUpload = $('#imageupload')[0];
          if (fileUpload.files.length > 0) {
            var promises = [];
            for (var i = 0; i < fileUpload.files.length; i++) {
              var file = fileUpload.files[i];
              var temp = file.name.split('.');
              var extension = temp[temp.length - 1];
              var name = control + (i + 1) + '.' + extension;

              var parseImg = new Parse.File(name, file);

              promises.push(parseImg.save());
            }
            return Parse.Promise.when(promises);
          }
        }
    }
})();
