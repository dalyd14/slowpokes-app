var pathLoc = ''

if(window.location.href.indexOf("/scores") > -1) {
    pathLoc = 'all'
    if(window.location.href.indexOf("/football") > -1) {
        pathLoc = 'football'
    }else if(window.location.href.indexOf("/basketball") > -1) {
        pathLoc = 'basketball'
    } else if(window.location.href.indexOf("/nfl") > -1) {
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

switch (pathLoc) {
    case 'all':
        Object.keys(queryStrings).forEach(key => {
            getScores(queryStrings[key])
            .then(scores => displayResults(key, prepareScores(scores)))
        })
        break;
    case 'football':
        ['nfl', 'ncaaf'].forEach(sport => {
            getScores(queryStrings[sport])
            .then(scores => displayResults(sport, prepareScores(scores)))            
        })
        break;
    case 'basketball':
        getScores(queryStrings.ncaaf)
        .then(scores => displayResults("ncaaf", prepareScores(scores)))
        break;
    case 'nfl':
        getScores(queryStrings.nfl)
        .then(scores => displayResults("nfl", prepareScores(scores)))
        break;
    case 'ncaaf':
        getScores(queryStrings.ncaaf)
        .then(scores => displayResults("ncaaf", prepareScores(scores)))
        break;
    case 'nba':

        break;
    case 'ncaab':

        break;
    default:
        break;
}