const { filterForScores } = require('../../lib/scores/scores')
const router = require('express').Router()
const fetch = require('node-fetch')

router.get('/scores', (req, res) => {
    let queryCurrentNCAAF = 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard'
    let queryCurrentNFL = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'

    let NCAAFresults = []
    let NFLresults = []

    fetch(queryCurrentNCAAF)
    .then(response => {
        if(!response.ok) {
            return alert('Error: ' + response.statusText)
        }
        return response.json()
    })
    .then(resNCAAF => {
        const NCAAFscores = filterForScores(resNCAAF)
        NCAAFresults = NCAAFscores
        return fetch(queryCurrentNFL)
    })
    .then(response => {
        if(!response.ok) {
            return alert('Error: ' + response.statusText)
        }
        return response.json()
    })
    .then(resNFL => {
        const NFLscores = filterForScores(resNFL)
        NFLresults = NFLscores

        res.json({ NCAAFresults, NFLresults })
    })

    
})

router.get('/scores/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result)
    } else {
        res.send(404)
    }
})

module.exports = router