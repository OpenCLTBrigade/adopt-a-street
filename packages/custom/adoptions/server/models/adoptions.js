'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Adoption Schema
 */
var AdoptionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  dateApproved: {
    type: Date,
  },
  cleanupDate: {
    type: Date,
  },
  expirationDate: {
    type: Date,
  },
  streetLocation: {
    type: String,
    required: true,
    trim: true
  },
  streetLength: {
    type: Number,
  },
  signVerbiage: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
    trim: true
  },
  ochAcknowledgement: {
    type: String,
    trim: true
  },
  catAcknowledgement: {
    type: String,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
AdoptionSchema.path('streetLocation').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

AdoptionSchema.path('status').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
AdoptionSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Adoption', AdoptionSchema);
