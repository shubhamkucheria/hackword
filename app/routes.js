
let jsonData = require('./word.json');
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
    var result = generateAnagrams(word);
    return jsonData.filter(x => result.includes(x));
}


module.exports = function (app) {
    app.post('/api/todo', function (req, res) {
    	var result = new Promise(function(resolve, reject) {
			resolve(benchMark(req.body.text));
		});
		result.then(function(value) {
			res.json({result: value});
		});        
    });
};
