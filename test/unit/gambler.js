'use strict';
/* jshint expr:true */
/* global describe, it, before, beforeEach */

var expect    = require('chai').expect,
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
        console.log(gambler);
        done();
      });
    });
  });
});
