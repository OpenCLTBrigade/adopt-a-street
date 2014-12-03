'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Adoptions = new Module('adoptions');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Adoptions.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Adoptions.routes(app, auth, database);

  //We are adding links to the main menu for all authenticated users
  Adoptions.menus.add({
    title: 'List Adoptions',
    link: 'all adoptions',
    roles: ['authenticated'],
    menu: 'main'
  });
  Adoptions.menus.add({
    title: 'Create Adoption',
    link: 'create adoption',
    roles: ['authenticated'],
    menu: 'main'
  });
  Adoptions.menus.add({
    title: 'adoptions example page',
    link: 'adoptions example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Adoptions.aggregateAsset('css', 'adoptions.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Adoptions.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Adoptions.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Adoptions.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Adoptions;
});
