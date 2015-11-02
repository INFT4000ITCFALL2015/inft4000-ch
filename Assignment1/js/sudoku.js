/*jslint browser: true*/
/*jslint plusplus: true*/
/*global  $*/


$(document).ready(function () {
    "use strict";

    var cells = $(".nestedTable td"),
        player,
        timer;

    function Player(name) {
        this.name = name;
        this.score = 900;
        this.playerWins = function () {
            alert("Congratulations, " + this.name + " you completed the puzzle! \n" +
                "Your score is " + this.score);
        }
    }// end Player constructor

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
        } else if (currentInput.length > 0) {
            isValid = false;
        }
        return isValid;
    }// end checkInput

    function countOccurrence(array, num) {
        var count = 0,
            i;
        for (i = 0; i < array.length; i++) {
            if (array[i] === num) {
                count += 1;
            }
        }
        return count;
    }// end countOccurrence

    function colorGrids() {
        var gridValues,
            i;
        for (i = 0; i < 9; i += 2) {
            gridValues = $("#grid" + i + " td");
            $(gridValues).css("background-color", "#ccffcc");
        }
        for (i = 1; i < 10; i += 2) {
            gridValues = $("#grid" + i + " td");
            $(gridValues).css("background-color", "#ffffcc");
        }
    }// end colorGrids

    function checkGrid(grid) {
        var gridValues = $("#" + grid + " td").text().split(""),
            errorFree = true,
            i;
        for (i = 1; i < 10; i++) {
            if (countOccurrence(gridValues, i.toString()) > 1) {
                errorFree = false;
            }
        }
        if (!errorFree) {
            $("#errorOutput").text("Value already exists in the grid");
        } else {
            $("#errorOutput").text("");
        }
        return errorFree;
    }// end checkGrid

    function checkColumn(column) {
        var targetColumn = $("[id$=_" + column + "]"),
            colValues = $(targetColumn).text().split(""),
            errorFree = true,
            i;
        for (i = 0; i < 10; i++) {
            if (countOccurrence(colValues, i.toString()) > 1) {
                errorFree = false;
            }
        }
        if (!errorFree) {
            $("#errorOutput").text("Value already exists in the column");
        } else {
            $("#errorOutput").text("");
        }
        return errorFree;
    }// end checkColumn

    function checkRow(row) {
        var targetRow = $("[id^=" + row + "_]"),
            rowValues = $(targetRow).text().split(""),
            errorFree = true,
            i;
        for (i = 0; i < 10; i++) {
            if (countOccurrence(rowValues, i.toString()) > 1) {
                errorFree = false;
            }
        }
        if (!errorFree) {
            $("#errorOutput").text("Value already exists in the row");
        } else {
            $("#errorOutput").text("");
        }
        return errorFree;
    }// end checkRow

    function setGridIDs() {
        var TDs = $(".nestedTable td"),
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
        var editCells = $(".emptyCell"),
            i;
        for (i = 0; i < editCells.length; i++) {
            $(editCells[i]).text("");
        }
        $(".newGame").css("visibility", "visible");
        $(".game").css("opacity", "0.25");
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
    }// end isGameDone

    function newGame(name) {
        player = new Player(name);
        $(".newGame").css("visibility", "hidden");
        $(".game").css("opacity", "1");
        setGridIDs();
        setEditableCells();
        colorGrids();
        timer = setInterval(function () {
            player.score -= 1;
        }, 1000);
    }// end newGame


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
            player.playerWins();
        }
    });// end cells keyup

    $("#reset").click(function () {
        resetGame();
    });// end reset listener

    $("#begin").click(function () {
        var playerName = $("#playerName").val();
        if (playerName.length > 0) {
            newGame(playerName);
        }
    });// end begin listener

});