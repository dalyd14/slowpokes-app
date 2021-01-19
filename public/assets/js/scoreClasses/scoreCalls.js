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

var queryTeamStrings = {
    nfl: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams?limit=900',
    ncaaf: 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams?groups=80&limit=900',
    nba: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams?limit=900',
    ncaab: 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?limit=900&groups=50'
}

const callPromise = (queryObj, isFilteredCall = false) => {
    Promise.all(getScores(queryObj)).then(values => {
        displayResults(values, isFilteredCall)
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