#!/usr/bin/env node
'use strict';

var exec = require('child_process').exec;

GLOBAL.window = {};
var rulesModule = require('../src/rules.js');

var rules = [];
if (process.argv.length > 1) {
  // Grab just the rules for supplied site.
  window.AD_DETECTOR_RULES[process.argv[1]].map(function(rule) {
    rules.push(rule);
  });
} else {
  for (var key in window.AD_DETECTOR_RULES) {
    window.AD_DETECTOR_RULES[key].map(function(rule) {
      rules.push(rule);
    });
  }
}

function test(ruleIndex) {
  if (ruleIndex > rules.length -1) {
    console.log('Done.');
    return;
  }

  var rule = rules[ruleIndex];
  console.log('Testing', rule.example, '...');
  var execStr = 'casperjs test casperTests.js --url="' + rule.example + '"';
  exec(execStr, function(err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      console.error('Error:', err);
      console.error(stderr);
    }
    test(ruleIndex + 1);
  });
}

test(0);