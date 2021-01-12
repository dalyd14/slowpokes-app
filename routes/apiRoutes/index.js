const router = require('express').Router();
const scoresRoutes = require('./scoresRoutes')

router.use(scoresRoutes);

module.exports = router;