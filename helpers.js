'use strict';

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var reach = require('origami').reach;
var nodefn = require('when/node');

var client = rest
  .wrap(mime, { mime: 'application/json' })
  .wrap(errorCode);

function normalizeOptions(opts) {
  var options = {};

  if (typeof opts !== 'object' && typeof opts !== 'string') {
    throw new TypeError('LeadDyno options must be a string or object');
  }

  if (typeof opts === 'string') {
    options.private_key = opts;
  }

  if (typeof opts === 'object') {
    options.base_url = opts.base_url;
    options.private_key = opts.private_key;
  }

  if (options.base_url == null) {
    options.base_url = 'https://api.leaddyno.com/v1/';
  }

  if (options.private_key == null) {
    throw new TypeError('LeadDyno requires a Private Key (options.private_key)');
  }

  return options;
}

function request(opts, cb) {
  var result = client(opts).fold(reach, 'entity');

  return nodefn.bindCallback(result, cb);
}

function isConstructed(inst, Ctor) {
  return (inst instanceof Ctor);
}

module.exports = {
  request: request,
  isConstructed: isConstructed,
  normalizeOptions: normalizeOptions
};
