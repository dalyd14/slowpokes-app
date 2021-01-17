function weekDetails(type, year, week) {
    this.seasonType = type;
    this.seasonYear = year;
    this.weekNum = week;
}

const filterForScores = (results) => {
    //status schedule = 1
    //status inProgress = 2
    //status final = 3
    //status postponed = 4
    //status canceled = 5
    let games = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
    }
    Object.keys(games).forEach(key => {
        games[key] = results.events.filter(game => game.status.type.id === key.toString());
    })
    return games
}

var pathLoc = ''

if(window.location.href.indexOf("/scores") > -1) {
    pathLoc = 'all'
    if(window.location.href.indexOf("/nfl") > -1) {
        pathLoc = 'nfl'
    } else if (window.location.href.indexOf("/ncaaf") > -1) {
        pathLoc = 'ncaaf'
    } else if (window.location.href.indexOf("/nba") > -1) {
        pathLoc = 'nba'
    } else if (window.location.href.indexOf("/ncaab") > -1) {
        pathLoc = 'ncaab'
    }
}

var queryStrings = {
    nfl: 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=900 ',
    ncaaf: 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=900 '
}

const getScores = query => {
    return new Promise((res, rej) => {
        fetch(query)
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(scores => {
                    res(scores)
                })
            }
        })
    })
}

const displayResults = (id, results) => {
    console.log(results)
}

switch (pathLoc) {
    case 'all':
        Object.keys(queryStrings).forEach(key => {
            getScores(queryStrings[key])
            .then(scores => displayResults(key, filterForScores(scores)))
        })
        break;
    case 'nfl':
        getScores(queryStrings.nfl)
        .then(scores => displayResults("nfl", filterForScores(scores)))
        break;
    case 'ncaaf':
        getScores(queryStrings.ncaaf)
        .then(scores => displayResults("ncaaf", filterForScores(scores)))
        break;
    case 'nba':

        break;
    case 'ncaab':

        break;
    default:
        break;
}