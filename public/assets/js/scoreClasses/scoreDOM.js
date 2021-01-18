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
    console.log(game)
    const thisGame = new gameClass(
        game.competitions[0].competitors[0],
        game.competitions[0].competitors[1],
        game.competitions[0],
        game.dateTime
    )
    pageHtml += `
    <div class="section-game">
        <div class="row score-row">
            <div class="col-10">
                <div class="row no-gutters team-info-row">
                    <div class="col-2 img-container">
                        <img class="score-team-img" src="${thisGame.getAwayDetails().logo}">
                    </div>
                    <div class="col-8 team-name-container">
                        <h5 class="team-name ${thisGame.getIfAwayLoss()}">${thisGame.getAwayDetails().teamName}</h5>
                    </div>
                    <div class="col-2 team-score-container">
                        <h5 class="score ${thisGame.getIfAwayLoss()}">${thisGame.getAwayScore()}</h5>
                    </div>
                </div>
                <div class="row no-gutters team-info-row">
                    <div class="col-2 img-container">
                        <img class="score-team-img" src="${thisGame.getHomeDetails().logo}">
                    </div>
                    <div class="col-8 team-name-container">
                        <h5 class="team-name ${thisGame.getIfHomeLoss()}">${thisGame.getHomeDetails().teamName}</h5>
                    </div>
                    <div class="col-2 team-score-container">
                        <h5 class="score ${thisGame.getIfHomeLoss()}">${thisGame.getHomeScore()}</h5>
                    </div>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-center game-info-row">
                <div class="row no-gutters">
                    <div class="col-12 quarter-container">
                        <h5 class="quarter">${thisGame.getQuarterOrDate()}</h5>
                    </div>
                    <div class="col-12 time-container">
                        <h5 class="time">${thisGame.getTimeLeftOrTime()}</h5>
                    </div>
                    <div class="col-12 network-container">
                        <h6 class="network">${thisGame.getNetwork()}</h6>
                    </div>
                </div>
            </div>
        </div>
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
        case 'STATUS_SCHEDULED':
            return 'Upcoming'
        case 'STATUS_IN_PROGRESS':
            return 'Going on now'
        case 'STATUS_FINAL':
            return 'Completed'
        case 'STATUS_POSTPONED':
            return 'Postponed'
        case 'STATUS_CANCELED':
            return 'Canceled'
        default:
            break;
    }
}

const displayGameLogic = (league) => {
    var gameCount = 0
    var thereIsMore = false
    var orderKeyArr = ['STATUS_IN_PROGRESS', 'STATUS_SCHEDULED', 'STATUS_FINAL', 'STATUS_POSTPONED', 'STATUS_CANCELED']
    orderKeyArr.forEach(key => {
        if(league.scores[key].length>0 && key!=='STATUS_CANCELED') {
            addSubtitle(getStatus(key))
            league.scores[key].forEach(game => {
                if (gameCount <= 5 || isLeaguePage) {
                    displayGame(game)
                    gameCount++    
                } else {
                    thereIsMore = true
                }
            })            
        }         
    })
    return thereIsMore
}

const displayResults = (results) => {
    console.log(results)
    if(results.some(entry => entry.sport === 'football')) {
        if(results.some(entry => entry.league === 'nfl')){
            addSectionUpper('nfl')
            results.filter(result => result.league === 'nfl').forEach(league => {
                var isMore = displayGameLogic(league)
                addLower(isMore, 'nfl')
            })
        }
        if(results.some(entry => entry.league === 'ncaaf')) {
            addSectionUpper('ncaaf')
            results.filter(result => result.league === 'ncaaf').forEach(league => {
                var isMore = displayGameLogic(league)
                addLower(isMore, 'ncaaf')
            })
        }
    } else if(results.some(entry => entry.sport === 'basketball')) {
        console.log('we got a basketball here')
    }
    $('#score-results').html(pageHtml)
}