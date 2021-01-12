const path = require('path')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../docs/index.html'));
});
router.get('/scores', (req, res) => {
    res.sendFile(path.join(__dirname, '../../docs/scores.html'))
})

module.exports = router