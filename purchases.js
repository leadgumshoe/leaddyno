'use strict';

var assign = require('lodash.assign');
var urlJoin = require('url-join');

var request = require('./helpers').request;
var isConstructed = require('./helpers').isConstructed;
var normalizeOptions = require('./helpers').normalizeOptions;

function Purchases(opts) {
  if (!isConstructed(this, Purchases)) {
    return new Purchases(opts);
  }

  var options = normalizeOptions(opts);

  this.create = this.create.bind(options);
}

Purchases.prototype.create = function createPurchase(data, cb) {
  var key = this.private_key;
  var baseUrl = this.base_url;

  var entity = assign({ key: key }, data);

  var opts = {
    path: urlJoin(baseUrl, '/purchases'),
    method: 'POST',
    entity: entity
  };

  return request(opts, cb);
};

module.exports = Purchases;
