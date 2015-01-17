'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Adoption = mongoose.model('Adoption'),
  _ = require('lodash');


/**
 * Find adoption by id
 */
exports.adoption = function(req, res, next, id) {
  Adoption.load(id, function(err, adoption) {
    if (err) return next(err);
    if (!adoption) return next(new Error('Failed to load adoption ' + id));
    req.adoption = adoption;
    next();
  });
};

/**
 * Create an adoption
 */
exports.create = function(req, res) {
  var adoption = new Adoption(req.body);
  adoption.user = req.user;
  adoption.save(function(err) {
    if (err) {
      return res.status(500).json( {
        error: 'Cannot save the adoption'
      });
    }
    res.json(adoption);

  });
};

/**
 * Update an adoption
 */
exports.update = function(req, res) {
  var adoption = req.adoption;

  adoption = _.extend(adoption, req.body);

  adoption.save(function(err) {
    if (err) {
      return res.status(500).json( {
        error: 'Cannot update the adoption'
      });
    }
    res.json(adoption);

  });
};

/**
 * Delete an adoption
 */
exports.destroy = function(req, res) {
  var adoption = req.adoption;

  adoption.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the adoption'
      });
    }
    res.json(adoption);

  });
};

/**
 * Show an adoption
 */
exports.show = function(req, res) {
  res.json(req.adoption);
};

/**
 * List of Adoptions
 */
exports.all = function(req, res) {
  Adoption.find().sort('-created').populate('user', 'name username').exec(function(err, adoptions) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the adoptions'
      });
    }
    res.json(adoptions);

  });
};
