var fs = require('fs');
var directory = process.argv[2];
var fileExtenstion = process.argv[3];
var regex = RegExp('\\.' + fileExtenstion + '$');
file = fs.readdir(directory, function (err, files) {
    for (i = 0; i < files.length; i++) {
        if (regex.test(files[i])) {
            console.log(files[i]);
        }
    }
});