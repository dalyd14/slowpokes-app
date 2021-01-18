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
    //status schedule = STATUS_SCHEDULED
    //status inProgress = STATUS_IN_PROGRESS
    //status final = STATUS_FINAL
    //status postponed = STATUS_POSTPONED
    //status canceled = STATUS_CANCELED
    let games = {
        STATUS_SCHEDULED: [],
        STATUS_IN_PROGRESS: [],
        STATUS_FINAL: [],
        STATUS_POSTPONED: [],
        STATUS_CANCELED: []
    }
    Object.keys(games).forEach(key => {
        if(key === "STATUS_IN_PROGRESS") {
            games[key] = scores.filter(
                game => game.status.type.name === key || 
                game.status.type.name === 'STATUS_HALFTIME' ||
                game.status.type.name === 'STATUS_END_PERIOD')
        } else {
            games[key] = scores.filter(game => game.status.type.name === key)
        }
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