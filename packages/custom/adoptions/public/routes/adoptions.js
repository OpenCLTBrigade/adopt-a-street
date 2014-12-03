'use strict';

angular.module('mean.adoptions').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    $stateProvider
      .state('adoptions example page', {
        url: '/adoptions/example',
        templateUrl: 'adoptions/views/index.html'
      })
      .state('all adoptions', {
        url: '/adoptions',
        templateUrl: 'adoptions/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create adoption', {
        url: '/adoptions/create',
        templateUrl: 'adoptions/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit adoption', {
        url: '/adoptions/:adoptionId/edit',
        templateUrl: 'adoptions/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('adoption by id', {
        url: '/adoptions/:adoptionId',
        templateUrl: 'adoptions/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
