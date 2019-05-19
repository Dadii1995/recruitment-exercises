const fs = require('fs');
const regex = /[a-zA-ZąĄĆĘŁŃÓŚŹŻćęłńóśźż]+/g;
const outputFileName = 'word_list.txt';
const inputFileName = 'pan_tadeusz.txt';

const inputFileContent=fs.readFileSync(inputFileName, 'utf8');

let uniqueWords =[];

if (fs.existsSync(outputFileName)) {
    fs.unlink(outputFileName, function (err) {
        if (err) console.log(err);
    });
}
let words = inputFileContent.match(regex);
words.forEach(word=>
{
    if (!uniqueWords.includes(word) && word!=null){
        uniqueWords.push(word);
    }
});

fs.appendFile(outputFileName, uniqueWords.join('\n'), function(err) {
    if(err) {
        return console.log(err);
    }
});
console.log('Done');
