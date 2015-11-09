(function () {
    "use strict";

    // array to hold the student objects as they are created
    var students = [];

    function showJSONtooltip() {
        var text = JSON.stringify(students),
            fixedText = text.replace(/},{/g, "},<br/>{"),
            myElement = document.getElementById("tooltip");

        myElement.innerHTML = fixedText;
        myElement.style.visibility = "visible";
    }

    function showTooltip() {
        var text = '{"Students":' + JSON.stringify(students) + '}',
            myJSON = JSON.parse(text),
            myElement = document.getElementById("tooltip"),
            i = 0;
        myElement.innerHTML = "";
        for (i; i < myJSON.Students.length; i++) {
            myElement.innerHTML +=
                myJSON.Students[i].id + ", " +
                myJSON.Students[i].fName + " " +
                myJSON.Students[i].lName + "<hr /><br />";
        }
        myElement.style.visibility = "visible";
    }

    function clearTooltip() {
        document.getElementById("tooltip").style.visibility = "hidden";
    }

    function resetInputBoxes() {
        var inputFields = document.getElementsByTagName("input"),
            errorBox = document.getElementById("errorField"),
            i = 0;
        for (i; i < inputFields.length; i++) {
            inputFields[i].value = "";
        }
        errorBox.style.visibility = "hidden";
        inputFields[0].focus();
    }

    function outputToList() {
        var myList = document.getElementById("displayStudents"),
            newItem = document.createElement("li"),
            student = students[students.length - 1],
            studentText = document.createTextNode(student.printStudent());
        myList.appendChild(newItem);
        newItem.appendChild(studentText);
    }

    function Student(id, fName, lName) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
    }

    Student.prototype.printStudent = function () {
        return this.id + ", " + this.fName + " " + this.lName;
    };

    // add new student object to the students array
    function newStudent(id, fname, lname) {
        var studentToAdd = new Student(id, fname, lname);
        students.push(studentToAdd);
        resetInputBoxes();
        outputToList();
    }

    // check for conflicts with pre-existing IDs
    function doesStudentExist(id) {
        var alreadyExists = false,
            i = 0;
        for (i; i < students.length; i++) {
            if (id === students[i].id) {
                alreadyExists = true;
            }
        }
        return alreadyExists;
    }

    // validate the user input before adding the new student
    function validateInput() {
        var id = document.getElementById("studentID").value,
            fName = document.getElementById("firstName").value,
            lName = document.getElementById("lastName").value,
            errorBox = document.getElementById("errorField");
        if (id === '' || fName === '' || lName === '') {
            errorBox.innerHTML = "Please fill in all fields";
        } else {
            if (!doesStudentExist(id)) {
                newStudent(id, fName, lName);
            } else {
                errorBox.innerHTML = "ID already in use";
                resetInputBoxes();
            }
        }
    }

    // submit button on click listener
    document.getElementById("submitStudent").addEventListener("click", function () {
        validateInput();
    });

    document.getElementById("studentList").addEventListener("mouseover", function () {
        showJSONtooltip();
    });

    document.getElementById("tooltip").addEventListener("click", function () {
        clearTooltip();
    });

}());