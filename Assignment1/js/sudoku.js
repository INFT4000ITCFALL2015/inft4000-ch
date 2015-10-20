/*jslint browser: true*/
/*jslint plusplus: true*/
/*global  $*/

$(document).ready(function () {
    "use strict";

    var cells = $("td");

    function setEditableCells() {
        var i;
        for (i = 0; i < cells.length; i++) {
            if ($(cells[i]).text() === "") {
                $(cells[i]).attr('contenteditable', 'true');
                $(cells[i]).attr('class', 'emptyCell');
            }
        }
    }// end setEditableCells

    function checkInput(editedCell, keyPressed) {
        var regexPattern = /^[1-9]$/,
            currentInput = $(editedCell).text(),
            isValid = true;
        if (!regexPattern.test(keyPressed)) {
            isValid = false;
            // show an error
        } else if (currentInput.length > 0) {
            isValid = false;
        }
        return isValid;
    }// end checkInput

    setEditableCells();

    // -----LISTENERS-----

    $(cells).keydown(function (event) {
        var keyPressed = String.fromCharCode(event.keyCode || event.charCode);
        // check for DEL or Backspace
        if (event.keyCode === 8 || event.keyCode === 46) {
            // do nothing
        } else if (!checkInput(this, keyPressed)) {
            event.preventDefault();
        }
    });// end cells keydown
});