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

const callPromise = queryArr => {
    Promise.all(getScores(queryArr)).then(values => {
        displayResults(values)
    })
}

switch (pathLoc) {
    case 'all':
        callPromise(Object.keys(queryStrings))
        break;
    case 'football':
        callPromise(['nfl', 'ncaaf'])
        break;
    case 'basketball':
        callPromise(['nba', 'ncaab'])
        break;
    case 'nfl':
        callPromise('nfl')
        break;
    case 'ncaaf':
        callPromise('ncaaf')
        break;
    case 'nba':

        break;
    case 'ncaab':

        break;
    default:
        break;
}