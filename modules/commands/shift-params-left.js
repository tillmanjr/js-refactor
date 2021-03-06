'use strict';

var editActions = require('../shared/edit-actions');
var logger = require('../shared/logger-factory')();
var selectionFactory = require('../shared/selection-factory');
var utilities = require('../shared/utilities');
var variableOrder = require('../refactoring-logic/variable-order');

function applyRefactor(vsEditor, selection) {
    var coords = utilities.buildCoords(vsEditor, 0);
    var text = variableOrder.shiftParamsLeft(selection[0]);

    editActions.applySetEdit(vsEditor, text, coords);
}

function wrapInCondition(vsEditor) {
    var selection = selectionFactory(vsEditor).getSelection(0);

    if (selection === null) {
        logger.info('Cannot shift parameters on an empty selection.');
    } else {
        applyRefactor(vsEditor, selection);
    }
}

module.exports = wrapInCondition;