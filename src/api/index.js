const router = require('express').Router();
const Controller = require("../controllers");

router.get('/', (req, res) => {
    res.send('Hello!')
})

router.get("/now_playing", Controller.getNowPlaying)
router.get("/popular", Controller.getPopular)
router.get("/top_rated", Controller.getTopRated)
router.get("/upcoming", Controller.getUpcoming)
router.get("/movie/search", Controller.getMovieSearch)
router.get("/movie/:id", Controller.getMovieDetail)

module.exports = router;