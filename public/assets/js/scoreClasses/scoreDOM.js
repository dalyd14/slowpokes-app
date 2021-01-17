// order:
// football
//    nfl
//       in progress 2
//       upcoming 1
//       completed 3
//       postponed 4
//    ncaaf
//       in progress 2
//       upcoming 1
//       completed 3
//       postponed 4
// basketball
//    nba
//       in progress 2
//       upcoming 1
//       completed 3
//       postponed 4
//    ncaab
//       in progress 2
//       upcoming 1
//       completed 3
//       postponed 4

var isLeaguePage = true
if (!(window.location.href.indexOf("/scores/nfl") > -1) && 
    !(window.location.href.indexOf("/scores/ncaaf") > -1) && 
    !(window.location.href.indexOf("/scores/nba") > -1) && 
    !(window.location.href.indexOf("/scores/ncaab") > -1)) {
        isLeaguePage = false
}

var pageHtml = ``

const addSectionUpper = (title) => {
    pageHtml += `
    <section id="${title}">
        <a class="section-title" href="/scores/${title}">
            <h3>${title.toUpperCase()}</h3>
        </a>`

}

const addSubtitle = (description) => {
    pageHtml += `
        <div class="section-subtitle">
            <h5>${description}</h5>
        </div>`
}

const displaySectionSubSubtitle = () => {
    
}

const displayGame = (game) => {
    pageHtml += `
    <div class="section-game">
        <p>${game.name}</p>
    </div>`
}

const addLower = (isMore, league) => {
    if(isMore) {
        pageHtml += `
        <a href="/scores/${league}">Show more games</a>`
    }
    pageHtml += `
    </section>`
}

const getStatus = (id) => {
    switch (id) {
        case '1':
            return 'Upcoming'
        case '2':
            return 'Going on now'
        case '3':
            return 'Completed'
        case '4':
            return 'Postponed'
        case '5':
            return 'Canceled'
        default:
            break;
    }
}

const displayGameLogic = (obj) => {
    var gameCount = 0
    var thereIsMore = false
    var orderKeyArr = ['2', '1', '3', '4', '5']
    orderKeyArr.forEach(key => {
            if(key === '1' && obj.scores[key].length>0) {
                addSubtitle(getStatus(key))
                obj.scores[key].forEach(game => {
                    if (gameCount <= 5 || isLeaguePage) {
                        displayGame(game)
                        gameCount++    
                    } else {
                        thereIsMore = true
                    }
                })
            }
            if(key === '2' && obj.scores[key].length>0) {
                addSubtitle(getStatus(key))
                obj.scores[key].forEach(game => {
                    if (gameCount <= 5 || isLeaguePage) {
                        displayGame(game)
                        gameCount++    
                    } else {
                        thereIsMore = true
                    }
                })
            }
            if(key === '3' && obj.scores[key].length>0) {
                addSubtitle(getStatus(key))
                obj.scores[key].forEach(game => {
                    if (gameCount <= 5 || isLeaguePage) {
                        displayGame(game)
                        gameCount++    
                    } else {
                        thereIsMore = true
                    }
                })
            }
            if(key === '4' && obj.scores[key].length>0) {
                addSubtitle(getStatus(key))
                obj.scores[key].forEach(game => {
                    if (gameCount <= 5 || isLeaguePage) {
                        displayGame(game)
                        gameCount++    
                    } else {
                        thereIsMore = true
                    }
                })
            }
            // if(key === '5' && obj.scores[key].length>0) {
            //     addSubtitle(getStatus(key))
            //     obj.scores[key].forEach(game => {
            //     if (gameCount <= 5 || isLeaguePage) {
            //         displayGame(game)
            //         gameCount++    
            //     } else {
            //         thereIsMore = true
            //     }
            //     })
            // }            
    })
    return thereIsMore
}

const displayResults = (results) => {
    console.log(results)
    if(results.some(entry => entry.sport === 'football')) {
        if(results.some(entry => entry.league === 'nfl')){
            addSectionUpper('nfl')
            results.filter(result => result.league === 'nfl').forEach(obj => {
                var isMore = displayGameLogic(obj)
                addLower(isMore, 'nfl')
            })
        }
        if(results.some(entry => entry.league === 'ncaaf')) {
            addSectionUpper('ncaaf')
            results.filter(result => result.league === 'ncaaf').forEach(obj => {
                var isMore = displayGameLogic(obj)
                addLower(isMore, 'ncaaf')
            })
        }
    } else if(results.some(entry => entry.sport === 'basketball')) {
        console.log('we got a basketball here')
    }
    $('#score-results').html(pageHtml)
}