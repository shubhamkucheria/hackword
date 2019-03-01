
let jsonData = require('./words.json');
function generateAnagrams(word) {
    if (word.length < 2) {
        return [word];
    } else {
        var anagrams = [];
        var before, focus, after;
        var shortWord, subAnagrams, newEntry;
        var i = 0;
        for (var i = 0; i < word.length; i++) {
            before = word.slice(0, i);
            focus = word[i];
            after = word.slice(i + 1, word.length + 1);
            shortWord = before + after;
            subAnagrams = generateAnagrams(shortWord);
            for (var j = 0; j < subAnagrams.length; j++){
                newEntry = focus + subAnagrams[j];
                anagrams.push(newEntry);
            }
        }
        return anagrams;
    }
}

/* Execution & Benchmarking */
function benchMark(word){
    console.time("time taken");
    var result = generateAnagrams(word);
    console.log(jsonData.filter(x => result.includes(x)));
    console.timeEnd("time taken");
}

benchMark("tac");


