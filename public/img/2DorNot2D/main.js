// Don't build actual TF scenarios in here. Functions only.


/*
                                       
,---.             |    o               
|__.   .,---.,---.|--- .,---.,---.,---.
|  |   ||   ||    |    ||   ||   |`---.
`  `---'`   '`---'`---'``---'`   '`---'
                                       
*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomise(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function probability(n) {
    return !!n && Math.random() <= n;
};

function removeDups(arr){
    return [...new Set(arr)];
}
function listToString(arr){
    // break apart the array, join with commas, and add 'and' for the last item.
    // let temp= arr;
    let temp = Object.assign([], arr);
    if (temp.length == 1){
        return temp;
    }
    let lastThing= temp[temp.length-1];
    temp.pop();
    return `${temp.join(", ")} and ${lastThing}`
  }
  
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


