const fs = require('fs');
const md5 = require('js-md5');
const inputFileName = process.argv[2];
const outputFileName = 'rainbow_word_list.txt';

if (fs.existsSync(outputFileName)) {
    fs.unlink(outputFileName, function (err) {
        if (err) console.log(err);
    });
}

let fileWords = fs.readFileSync(inputFileName, 'utf8').split('\n');
let outputFileContent =[];
fileWords.forEach(word=>{
    let lineToWrite = `${word}\t${md5(word)}`;
    outputFileContent.push(lineToWrite);
});
fs.appendFile(outputFileName, outputFileContent.join('\n'), function(err) {
    if(err) {
        return console.log(err);
    }
});

console.log('Done');
