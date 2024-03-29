
gameID =  location.hash.slice(1).split('&')[0]
userName = location.hash.slice(1).split('&')[1]
timeStamp = new Date().getTime();
userScores = new Map()
    
nxt.ajax({
    url:'./game.php?gameID='+gameID+'&user='+userName+'&fetch-only=end&seed='+timeStamp
}).then((file) => {
    readFile(file)
    score()
    renderScore()
    
    userNameHolder.innerHTML = userName
})


function score() {
    state.users=state.users.sort( (b,a) => countPoints(a.cards,a.coins) - countPoints(b.cards,b.coins))
    for (let i=0;i<state.users.length;i++){
        let user = state.users[i].name
        let cards = state.users[i].cards.filter(x=>x!==null)
        let coins = state.users[i].coins
        //console.log("cards: "+cards)
        //console.log("coins: "+coins)
        let points = countPoints(cards,coins)
        userScores.set(user, points)
        
    }
    return userScores
}

function renderScore() {
    scoreTable=""
    let count=1;
    userScores.forEach((val, key)=>{
        if (key == userName) {
            yourPoints.innerHTML = val;
            yourPosition.innerHTML = count;
        }
        let tr= '<tr>'
        tr+='<td>'+key+'<td>'
        tr+='<td>'+val+'<td>'
        tr+='</tr>'
        scoreTable+=tr
        count++;
    })
    leaderboard.innerHTML=scoreTable
}