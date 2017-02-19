'use strict';

var editActions = require('../shared/edit-actions');
var logger = require('../shared/logger-factory')();
var refactoring = require('../refactoring-logic/to-member-assignment');
var selectionFactory = require('../shared/selection-factory');
var utilities = require('../shared/utilities');

module.exports = function (vsEditor) {
    var selection = selectionFactory(vsEditor).getSelection(0);

    function applyRefactor() {
        var coords = utilities.buildCoords(vsEditor, 0);

        // selection[0] = refactoring.refactorToMemberAssignment(selection[0]);
        const result = refactoring.refactorToMemberAssignment(selection, 'const');
        editActions.applySetEdit(vsEditor, result.join('\n'), coords);
    }


    function getErrorMessage() {
        var message = '';
        
        if (selection === null) {
            message = 'Cannot perform member assignment conversion on an empty selection.';
        } else if (!refactoring.canCreateMemberAssignment(selection[0])) {
            message = 'No appropriate text to convert did you select a line containing something to convert?';
        }
        
        return message;
    }

    function toMemberAssignment() {
        var message = getErrorMessage();
        
        if (message !== '') {
            logger.log(message);
        } else {
            applyRefactor();
        }
    }

    toMemberAssignment();

};