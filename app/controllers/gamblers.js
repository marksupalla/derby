'use strict';

var Gambler = require('../models/gambler');

exports.init = function(req, res){
  res.render('gamblers/init');
};

exports.create = function(req, res){
  var gambler = new Gambler(req.body);
  gambler.save(function(){
    res.redirect('/gamblers');
  });
};

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.show = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    res.render('gamblers/show', {gambler:gambler});
  });
};

/*exports.destroy = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    gambler.removeAsset(req.params.name);
    var isDivorced = !this.assets ? true : false;
    gambler.save(function(err, gambler){
      res.send('gamblers/index', {id: req.params.id, name: req.params.name, isDivorced: isDivorced, cash: gambler.cash});
    });
  });
};
*/
