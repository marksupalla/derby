'use strict';
/* jshint expr:true */
/* global describe, it, before, beforeEach */

var expect    = require('chai').expect,
    Mongo     = require('mongodb'),
    Gambler   = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'derby-test';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });
  describe('#save', function(){
    it('should save a gambler to the db', function(done){
      var mark = new Gambler({name:'Mark'});
      mark.save(function(err, gambler){
        expect(gambler._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find a gambler', function(done){
      Gambler.findById('000000000000000000000001', function(err, gambler){
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.name).to.equal('Bob');
        done();
      });
    });
  });
  describe('#removeAsset', function(){
    it('should remove asset from gambler and add value to cash', function(){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.removeAsset({name:'ring'});
        expect(gambler.assets).to.have.length(1);
        expect(gambler.cash).to.equal(2000);
      });
    });
  });
  describe('#addAsset', function(){
    it('should add asset to gambler', function(){
      var o = {name:'tv', photo:'tv.com', value:'1000'};
      Gambler.findById('000000000000000000000002', function(gambler){
        gambler.addAsset(o);
        expect(gambler.assets).to.have.length(3);
        expect(gambler.assets[2].name).to.equal('tv');
        expect(gambler.assets[2].photo).to.equal('tv.com');
        expect(gambler.assets[2].value).to.equal(1000);
      });
    });
  });

});
