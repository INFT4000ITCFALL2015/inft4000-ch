var fM = require('./filterModule');
var directory = process.argv[2];
var fileExtenstion = process.argv[3];
fM(directory, fileExtenstion, function(err, files) {
    for (i = 0; i < files.length; i++) {
        console.log(files[i]);
    }
});