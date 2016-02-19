'use strict';

var Leads = require('./leads');
var Visitors = require('./visitors');
var Purchases = require('./purchases');

var isConstructed = require('./helpers').isConstructed;
var normalizeOptions = require('./helpers').normalizeOptions;

function LeadDyno(opts) {
  if (!isConstructed(this, LeadDyno)) {
    return new LeadDyno(opts);
  }

  var options = normalizeOptions(opts);

  this.leads = new Leads(options);
  this.visitors = new Visitors(options);
  this.purchases = new Purchases(options);
}

module.exports = LeadDyno;
