'use strict';

var assign = require('lodash.assign');
var urlJoin = require('url-join');

var request = require('./helpers').request;
var isConstructed = require('./helpers').isConstructed;
var normalizeOptions = require('./helpers').normalizeOptions;

function Visitors(opts) {
  if (!isConstructed(this, Visitors)) {
    return new Visitors(opts);
  }

  var options = normalizeOptions(opts);

  this.create = this.create.bind(options);
}

Visitors.prototype.create = function createVisitor(data, cb) {
  var key = this.private_key;
  var baseUrl = this.base_url;

  var entity = assign({ key: key }, data);

  var opts = {
    path: urlJoin(baseUrl, '/visitors'),
    method: 'POST',
    entity: entity
  };

  return request(opts, cb);
};

module.exports = Visitors;
