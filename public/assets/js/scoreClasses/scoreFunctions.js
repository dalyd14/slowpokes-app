function weekDetails(type, year, week) {
    this.seasonType = type;
    this.seasonYear = year;
    this.weekNum = week;
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
        games[key] = scores.events.filter(game => game.status.type.id === key.toString());
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

const prepareScores = scores => {
    scores = filterForScores(scores)
    scores = sortScore(scores)
    return scores
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