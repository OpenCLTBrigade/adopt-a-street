'use strict';

//Adoptions service used for adoptions REST endpoint
angular.module('mean.adoptions').factory('Adoptions', ['$resource',
  function($resource) {
    return $resource('adoptions/:adoptionId', {
      adoptionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
