'use strict';

var functionUtils = require('../shared/function-utils');

function canCreateMemberAssignment (selection){
    return selection.match(/\w+/) !== null;
}

function buildRefactorRegex (paramName) {
    var regex = paramName + '\\s*\\';
    return new RegExp(regex);
}

function refactorToMemberAssignment (selections) {
  var matches = selections.match(/\w+/);
  var transformed = [];
  if (matches) {
    matches.forEach( (match) => {
      if (match && match.length >= 0) {
        transformed.push(`this.${match} = ${match};`)
      }
    })
  }

  return transformed.length <= 0 ? selections : transformed.join(';\n')
  
}

module.exports = {
    canCreateMemberAssignment: canCreateMemberAssignment,
    refactorToMemberAssignment: refactorToMemberAssignment
}