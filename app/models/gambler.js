'use strict';
var _     = require('lodash'),
    Mongo = require('mongodb');

function Gambler(o){

  this.name        = o.name;
  this.photo       = o.photo;
  this.spouse      = o.spouse;
  this.cash        = o.cash;
  this.assets      = o.assets;
  this.results     = o.results;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, obj){
    var gambler = changePrototype(obj);
    cb(err, gambler);
  });
};

Gambler.deleteById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findAndRemove({_id:_id}, cb);
};

module.exports = Gambler;

// Private Function //

function changePrototype(obj){
  return _.create(Gambler.prototype, obj);
}
