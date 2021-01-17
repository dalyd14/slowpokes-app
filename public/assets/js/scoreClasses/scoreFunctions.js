function weekDetails(type, year, week) {
    this.seasonType = type;
    this.seasonYear = year;
    this.weekNum = week;
}

function scoreObj(sport, league, scores) {
    this.sport = sport;
    this.league = league;
    this.scores = scores
}

const getRealDates = scores => {
    scores.forEach(score => {
        score.dateTime = moment.utc(score.date, "YYYY-MM-DDTH:mmZ").local().format('MMMM Do YYYY, h:mm a')
    })
    return scores
}

const typeScores = (sport, games) => {
    let scores = ''
    switch (sport) {
        case 'nfl':
            scores = new scoreObj('football', sport, games)
            break;
        case 'ncaaf':
            scores = new scoreObj('football', sport, games)
            break;
        case 'nba':
            scores = new scoreObj('basketball', sport, games)
            break;
        case 'ncaab':
            scores = new scoreObj('basketball', sport, games)
            break;
        default:
            break;
    }
    return scores
}

const filterForScores = (scores) => {
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
        games[key] = scores.filter(game => game.status.type.id === key.toString());
    })
    return games
}

const sortScore = (scores, sortType = 'oldFirst') => {
    // must sort AFTER filtering
    // sort options:
    // oldFirst & newFirst
    Object.keys(scores).forEach(key => {
        if (sortType === 'oldFirst') {
            scores[key] = scores[key].sort((a, b) => (moment.utc(a.date, "YYYY-MM-DDTH:mmZ") - moment.utc(b.date, "YYYY-MM-DDTH:mmZ")))
        } else if (sortType === 'newFirst') {
            scores[key] = scores[key].sort((a, b) => (moment.utc(b.date, "YYYY-MM-DDTH:mmZ") - moment.utc(a.date, "YYYY-MM-DDTH:mmZ")))
        }
    })

    return scores
}

const prepareScores = (sport, scores) => {
    scores = getRealDates(scores.events)
    scores = typeScores(sport, scores)
    scores.scores = filterForScores(scores.scores)
    scores.scores = sortScore(scores.scores)
    return scores
}

const getScores = querys => {
    if (!Array.isArray(querys)) {
        querys = [querys]
    }
    return querys.map(key => {
        return new Promise((res, rej) => {
            fetch(queryStrings[key])
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then(scores => {
                        res(prepareScores(key, scores))
                    })
                }
            })            
        })
    })
}