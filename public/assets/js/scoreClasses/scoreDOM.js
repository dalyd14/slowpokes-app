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

const whatPage = () => {
    const page = {
        isLeaguePage: true,
        whatSport: 'all',
        whatLeague: 'all'
    }
    if (!(window.location.href.indexOf("/scores/nfl") > -1) && 
        !(window.location.href.indexOf("/scores/ncaaf") > -1) && 
        !(window.location.href.indexOf("/scores/nba") > -1) && 
        !(window.location.href.indexOf("/scores/ncaab") > -1)) {
            page.isLeaguePage = false
    } else {
        if (window.location.href.indexOf("nfl") > -1) {
            page.whatSport = 'football'
            page.whatLeague = 'nfl'
        } else if (window.location.href.indexOf("ncaaf") > -1) {
            page.whatSport = 'football'
            page.whatLeague = 'ncaaf'
        } else if (window.location.href.indexOf("nba") > -1) {
            page.whatSport = 'basketball'
            page.whatLeague = 'nba'
        } else if (window.location.href.indexOf("ncaab") > -1) {
            page.whatSport = 'basketball'
            page.whatLeague = 'ncaab'
        }
    }
    return page    
}

var currentPage = whatPage()

var scoresHtml = ``
var searchHtml = ``

const addFootballFilter = (yearOptions, weekOptions, teamOptions) => {
    searchHtml += `
    <form id="scheduleSelector" data-league="${currentPage.whatLeague}" class="d-flex justify-content-between">
        <div class="scheduleChanger d-flex">
            <div class="form-group">
                <select class="form-control" id="yearSelect">
                    ${yearOptions}
                </select>
            </div>
            <div class="form-group">
                <select class="form-control" id="weekSelect">
                    ${weekOptions}
                </select>
            </div>
        </div>
        </div class="teamFilter">
            <div class="form-group">
                <select class="form-control" id="teamSelect">
                    <option selected value="all">All</option>
                    ${teamOptions}
                </select>
            </div>
        </div>
    </form>
    `
}

const addBasketballFilter = (yearOptions, teamOptions) => {
    searchHtml += `
    <form id="scheduleSelector" data-league="${currentPage.whatLeague}" class="d-flex justify-content-between">
        <div class="scheduleChanger d-flex">
            <div class="form-group">
                <select class="form-control" id="yearSelect">
                    ${yearOptions}
                </select>
            </div>
        </div>
        </div class="teamFilter">
            <div class="form-group">
                <select class="form-control" id="teamSelect">
                    <option selected value="all">All</option>
                    ${teamOptions}
                </select>
            </div>
        </div>
    </form>
    `
}

const addSectionUpper = (title) => {
    scoresHtml += `
    <section id="${title}">
        <a class="section-title d-flex align-items-center" href="/scores/${title}">
            <h3>${title.toUpperCase()}</h3>
        </a>`
}

const addSubtitle = (description) => {
    scoresHtml += `
        <div class="section-subtitle">
            <h5>${description}</h5>
        </div>`
}

const displayGame = (game) => {
    const thisGame = new gameClass(
        game.competitions[0].competitors[0],
        game.competitions[0].competitors[1],
        game.competitions[0],
        game.dateTime,
        currentPage.whatLeague
    )
    scoresHtml += `
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
        scoresHtml += `
        <div class="showMoreGamesBtn d-flex justify-content-center align-items-center my-2">
            <a class="badge badge-pill" href="/scores/${league}"><i class="plus icon"></i> Show more ${league.toUpperCase()} games</a>
        </div>`
    }
    scoresHtml += `
    </section>`
}

const getStatus = (id) => {
    switch (id) {
        case 'STATUS_SCHEDULED':
            return 'Upcoming'
        case 'STATUS_IN_PROGRESS':
        case 'STATUS_HALFTIME':
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
    console.log(league)
    orderKeyArr.forEach(key => {
        if(league.scores[key].length>0 && key!=='STATUS_CANCELED') {
            if (gameCount < 5 || currentPage.isLeaguePage) {
                addSubtitle(getStatus(key))                
            }
            league.scores[key].forEach(game => {
                if (gameCount < 5 || currentPage.isLeaguePage) {
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

const displayResults = (results, isFilteredCall=false) => {
    scoresHtml = ``
    if (!isFilteredCall) {
        searchHtml = ``
        if(currentPage.isLeaguePage) {
            if(currentPage.whatSport === 'football') {
                Promise.all(populateFilters(queryStrings[currentPage.whatLeague], queryTeamStrings[currentPage.whatLeague], true)).then(options => {
                    addFootballFilter(
                        options.find(el => 'options' in el).options.yearHtml, 
                        options.find(el => 'options' in el).options.weekHtml, 
                        options.find(el => 'teams' in el).teams)
                    $('#filters').html(searchHtml)
                })
            } else if (currentPage.whatSport === 'basketball') {
                Promise.all(populateFilters(queryStrings[currentPage.whatLeague], queryTeamStrings[currentPage.whatLeague], false)).then(options => {
                    addBasketballFilter(
                        options.find(el => 'options' in el).options.yearHtml, 
                        options.find(el => 'teams' in el).teams)
                    $('#filters').html(searchHtml)
                })
            }
        }
    }

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
    } 
    if(results.some(entry => entry.sport === 'basketball')) {
        if(results.some(entry => entry.league === 'nba')){
            addSectionUpper('nba')
            results.filter(result => result.league === 'nba').forEach(league => {
                var isMore = displayGameLogic(league)
                addLower(isMore, 'nba')
            })
        }
        if(results.some(entry => entry.league === 'ncaab')) {
            addSectionUpper('ncaab')
            results.filter(result => result.league === 'ncaab').forEach(league => {
                var isMore = displayGameLogic(league)
                addLower(isMore, 'ncaab')
            })
        }
    }
    $('#score-results').html(scoresHtml)
}