var path = require('path'),
    fullPathToConfig = path.join(__dirname, '../config/config.json'),
    config = require(fullPathToConfig),
    fs = require('fs');

var dest = '',
    relativePath = 'sber-together-api/public/frontend',
    defaultPath = path.join(__dirname, '..', 'public/'),
    args = process.argv.slice(2);


var checkIfExists = function(path) {
    try {
        fs.statSync(path);
    } catch (err) {
        return false;
    }

    return true;
};

var successMsg = function(path) {
    console.log('\n\nPath to public folder is set to ' + path + '\n\n');
};

var errorMsg = function(path) {
    console.log('\n\nUnable to find "' + path + '"\n\n');
};

if (args[1]) {

    var providedPath = args[1];

    if (checkIfExists(providedPath)) {
        dest = providedPath;
        successMsg(providedPath);
    } else {
        errorMsg(providedPath);
    }

} else if (args[0] == "server") {
    var currentDir = __dirname,
        rootDir = path.parse(__dirname).root;
    
    while (currentDir != rootDir) {
        tempDir = path.join(currentDir, relativePath);

        var exists = checkIfExists(tempDir);

        if (exists) {
            dest = tempDir;
            successMsg(tempDir)
            break;
        } else {
            currentDir = path.join(currentDir, '..');
        }
    }

    if (!dest) {
        errorMsg(relativePath);
        console.log(
            ' You should provide full path as a second argument');
    }
};

if (!dest) {
    dest = defaultPath;
    successMsg(defaultPath);
}

config.pathToPublic = dest;

fs.writeFileSync(fullPathToConfig, JSON.stringify(config));