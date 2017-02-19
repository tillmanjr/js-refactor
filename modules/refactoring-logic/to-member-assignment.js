'use strict';

var functionUtils = require('../shared/function-utils');

function canCreateMemberAssignment (selection){
  if(Array.isArray(selection) && selection.lenght > 0) {
    return selection[0].trim().match(/\w+/) !== null;
  }

  return selection.match(/\w+/) !== null;
}

const composeAssignment = (memberPrefix, memberName, memberType) => {
  if (memberPrefix === 'this') {
    return `this.${memberName} = ${memberName};`;
  }
  
  const memberDeclaration = (memberType && memberType.length > 0) ?
    `${memberName}: ${memberType} = ${memberName};` :
    `${memberName} = ${memberName};`;
  
  return (memberPrefix && memberPrefix.trim().length > 0) ?
    `${memberPrefix} ${memberDeclaration}` :
    memberDeclaration;
}

function refactorToMemberAssignment (selections, prefix) {
  const lines = Array.isArray(selections) && selections.length > 0 ?
    selections:
    [selections.trim()];
  
  var transformed = [];

  lines.forEach ( (line) => {
    // comma separated items on a line such as in an args list
    const items = line.split(',');
    items.forEach( (item) => {
      const lhs = item.trim();
      const hasType = lhs.indexOf(':') >= 0;
      const memberType = hasType ? lhs.split(':')[1].trim() : '';
      const memberName = hasType ? lhs.split(':')[0].trim() : lhs;

      const assignment = composeAssignment(
        prefix,
        memberName,
        memberType
        );

      transformed.push(assignment);
      
    });
  });

  return transformed.length <= 0 ? selections : transformed;
}

module.exports = {
    canCreateMemberAssignment: canCreateMemberAssignment,
    refactorToMemberAssignment: refactorToMemberAssignment
}