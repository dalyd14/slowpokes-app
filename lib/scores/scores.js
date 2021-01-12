const filterForScores = results => {
    //there is a better way to declare this object
    const currentDetails = { 
        seasonType: results.season.type,
        seasonYear: results.season.year,
        weekNum: results.week.number
    }

    //filter out all games that are canceled
    let games = results.events
    games = games.filter(game => game.status.type.id !== '5')

    return games
}

module.exports = {
    filterForScores
}