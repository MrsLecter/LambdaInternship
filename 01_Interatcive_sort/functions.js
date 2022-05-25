//Sort words alphabetically
function getAlphabetSort(arr){
    let words = arr.filter(item => isNaN(item));
    return words.sort();
}

// Show [numbers] from lower to higher
function getASCSort(arr){
    let numb = arr.filter(item => isNaN(Number(item))===false);
    numb = numb.map(item => Number(item))
    return numb.sort((a, b) => a - b);
}

// Show [numbers] from higher to lower
function getDESCSort(arr){
    let numb = arr.filter(item => isNaN(Number(item))===false);
    numb = numb.map(item => Number(item))
    return numb.sort((a, b) => b - a);
}

//Display [words] in ascending order by number of letters in the word
function getASCSortLetterNumber(arr){
    let words = arr.filter(item => isNaN(item));
    return words.sort((a,b)=>a.length - b.length)
}

//Show only unique [words]
function getUniqueWords(arr){
    let words = arr.filter(item => isNaN(item));
    let uniq_words = new Set(words);
    return Array.from(uniq_words);
}

//Display only unique values from the set of [words] and [numbers] entered by the user
function getUniqueAll(arr){
    let uniq = new Set(arr);
    return Array.from(uniq);
}

module.exports = {getAlphabetSort, getASCSort, getDESCSort,getASCSortLetterNumber, getUniqueWords,  getUniqueAll};