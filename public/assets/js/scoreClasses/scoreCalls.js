var pathLoc = ''

if(window.location.href.indexOf("/scores") > -1) {
    pathLoc = 'all'
    if(window.location.href.indexOf("/football") > -1) {
        pathLoc = 'football'
    } else if(window.location.href.indexOf("/basketball") > -1) {
        pathLoc = 'basketball'
    } else if(window.location.href.indexOf("/favorites") > -1) {
        pathLoc = 'favorites'
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
    nfl: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=900',
    ncaaf: 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=900',
    nba: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?limit=900',
    ncaab: 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?limit=900'
}

const callPromise = queryObj => {
    Promise.all(getScores(queryObj)).then(values => {
        displayResults(values)
    })
}

const callCustom = query => {
    return new Promise((res, rej) => {
        fetch(query).then(ans => {
            if(ans.ok) {
                ans.json().then(scores => {
                    res(scores)
                })
            }
        })        
    })
}

switch (pathLoc) {
    case 'all':
        callPromise(queryStrings)
        break;
    case 'football':
        callPromise({nfl: queryStrings.nfl, ncaaf: queryStrings.ncaaf})
        break;
    case 'basketball':
        callPromise({nfl: queryStrings.nba, ncaaf: queryStrings.ncaab})
        break;
    default:
        callPromise({[pathLoc]: queryStrings[pathLoc]})
        break;
}