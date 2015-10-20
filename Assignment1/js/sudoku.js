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

    function countOccurance(array, num) {
        var count = 0,
            i;
        for (i = 0; i < array.length; i++) {
            if (array[i] === num) {
                count += 1;
            }
        }
        return count;
    }// end countOccurance

    function checkGrid(grid) {
        var gridValues = $("#" + grid + " td").text().split(""),
            errorFree = true,
            i;
        for (i = 1; i < 10; i++) {
            if (countOccurance(gridValues, i.toString()) > 1) {
                errorFree = false;
            }
        }
        return errorFree;
    }// end checkGrid

    function checkColumn(column) {
        var targetColumn = $("[id$=_" + column + "]"),
            colValues = $(targetColumn).text().split(""),
            errorFree = true,
            i;
        for (i = 0; i < 10; i++) {
            if (countOccurance(colValues, i.toString()) > 1) {
                errorFree = false;
            }
        }
        return errorFree;
    }// end checkColumn

    function checkRow(row) {
        var targetRow = $("[id^=" + row + "_]"),
            rowValues = $(targetRow).text().split(""),
            errorFree = true,
            i;
        for (i = 0; i < 10; i++) {
            if (countOccurance(rowValues, i.toString()) > 1) {
                errorFree = false;
            }
        }
        return errorFree;
    }// end checkRow

    function setGridIDs() {
        var TDs = $("td"),
            i = 0,
            row,
            col,
            rStart = 1,
            rStop = 4;
        while (i < 82) {
            for (row = rStart; row < rStop; row++) {
                for (col = 1; col < 4; col++) {
                    $(TDs[i]).attr("id", row + "_" + col);
                    i++;
                }
            }
            for (row = rStart; row < rStop; row++) {
                for (col = 4; col < 7; col++) {
                    $(TDs[i]).attr("id", row + "_" + col);
                    i++;
                }
            }
            for (row = rStart; row < rStop; row++) {
                for (col = 7; col < 10; col++) {
                    $(TDs[i]).attr("id", row + "_" + col);
                    i++;
                }
            }
            rStart += 3;
            rStop += 3;
        }
    }// end setGridIDs

    function resetGame() {
        //$(".emptyCells").text("");
        var editCells = $(".emptyCell"),
            i;
        for (i = 0; i < editCells.length; i++) {
            $(editCells[i]).text("");
        }
    }// end resetGame

    function isGameDone() {
        var gameDone = true,
            i;
        for (i = 0; i < cells.length; i++) {
            if ($(cells[i]).text() === "") {
                gameDone = false;
            }
        }
        if (gameDone) {
            for (i = 1; i < 10; i++) {
                if (!checkColumn(i) || !checkRow(i)) {
                    gameDone = false;
                }
            }
        }
        return gameDone;
    }


    setGridIDs();
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

    $(cells).keyup(function () {
        var id = $(this).parents("table").attr("id"),
            coord = $(this).attr("id").split("_");
        if (!checkGrid(id) || !checkRow(coord[0]) || !checkColumn(coord[1])) {
            $(this).css("color", "red");
        } else {
            $(this).css("color", "green");
        }
        if (isGameDone()) {
            alert("Congrats");
        }
    });// end cells keyup

    $("#reset").click(function () {
        resetGame();
    });// end reset listener

});