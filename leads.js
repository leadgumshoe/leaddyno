'use strict';

var assign = require('lodash.assign');
var urlJoin = require('url-join');

var request = require('./helpers').request;
var isConstructed = require('./helpers').isConstructed;
var normalizeOptions = require('./helpers').normalizeOptions;

function Leads(opts) {
  if (!isConstructed(this, Leads)) {
    return new Leads(opts);
  }

  var options = normalizeOptions(opts);

  this.create = this.create.bind(options);
}

Leads.prototype.create = function createLead(data, cb) {
  var key = this.private_key;
  var baseUrl = this.base_url;

  var entity = assign({ key: key }, data);

  var opts = {
    path: urlJoin(baseUrl, '/leads'),
    method: 'POST',
    entity: entity
  };

  return request(opts, cb);
};

module.exports = Leads;
