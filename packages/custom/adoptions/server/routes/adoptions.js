'use strict';

var adoptions = require('../controllers/adoptions');

// Adoption authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.adoption.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

// The Package is past automatically as first parameter
module.exports = function(Adoptions, app, auth, database) {

  app.get('/adoptions/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/adoptions/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/adoptions/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/adoptions/example/render', function(req, res, next) {
    Adoptions.render('index', {
      package: 'adoptions'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

  app.route('/adoptions')
    .get(adoptions.all)
    .post(auth.requiresLogin, adoptions.create);
  app.route('/adoptions/:adoptionId')
    .get(adoptions.show)
    .put(auth.requiresLogin, hasAuthorization, adoptions.update)
    .delete(auth.requiresLogin, hasAuthorization, adoptions.destroy);

  // Finish with setting up the adoptionId param
  app.param('adoptionId', adoptions.adoption);
};
