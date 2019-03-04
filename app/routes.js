
let jsonData = require('./wordByLength.json');
function generateAnagrams(word) {
    if (word.length < 2) {
        return [word];
    } else {
        let anagrams = [];
        let before, focus, after;
        let shortWord, subAnagrams, newEntry;
        let i = 0;
        for (let i = 0; i < word.length; i++) {
            before = word.slice(0, i);
            focus = word[i];
            after = word.slice(i + 1, word.length + 1);
            shortWord = before + after;
            subAnagrams = generateAnagrams(shortWord);
            for (let j = 0; j < subAnagrams.length; j++){
                newEntry = focus + subAnagrams[j];
                anagrams.push(newEntry);
            }
        }
        return anagrams;
    }
}

function allPossibleCombinations(input, length, curstr) {
    if(curstr.length == length) return [ curstr ];
    var ret = [];
    for(var i = 0; i < input.length; i++) {
        ret.push.apply(ret, allPossibleCombinations(input, length, curstr + input[i]));
    }
    return ret;
}


function benchMark(word, limit){
    var result = generateAnagrams(word);
    let objKey = word.length;
    if(limit && (limit < objKey) ) {
        objKey = limit;
        var pp = allPossibleCombinations(word.split(""), limit, '');
        pp.sort(function(a, b){return a.length - b.length});
        var objOfWord = {};
        pp.forEach((item) => {
            if(objOfWord[item.length]) {
                objOfWord[item.length].push(item);
            } else {
                objOfWord[item.length] = [];
                objOfWord[item.length].push(item);
            } 
        });
        return jsonData[objKey].filter(x => objOfWord[objKey].includes(x));
    } else {
        if(jsonData[objKey] > result.length) {
            return [...new Set(jsonData[objKey].filter(x => result.includes(x)))];
        } else {
            return [...new Set(result.filter(x => jsonData[objKey].includes(x)))];
        }
    }
}


module.exports = function (app) {
    app.post('/api/todo', function (req, res) {
    	let result = new Promise(function(resolve, reject) {

            let finalWords = benchMark(req.body.text, req.body.length);
            console.log(finalWords);
            resolve(finalWords);
		});
		result.then(function(value) {
			res.json({result: value});
		});        
    });
};
