const fs = require('fs');
const rainbowTableFileName = process.argv[2];
const outputFileName = 'result.txt';
const md5Password = process.argv[3];

if (fs.existsSync(outputFileName)) {
    fs.unlink(outputFileName, function (err) {
        if (err) console.log(err);
    });
}

let rainbowTableLines = fs.readFileSync(rainbowTableFileName, 'utf8').split('\n');

let password = rainbowTableLines.filter(x=>x.includes(md5Password))[0].split('\t');

fs.appendFile(outputFileName, password[0], function(err) {
    if(err) {
        return console.log(err);
    }
});
console.log(password);
