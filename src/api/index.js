const router = require('express').Router();
const Controller = require("../controllers");

router.get('/', (req, res) => {
    res.send('Hello!')
})

router.get("/movies/now_playing", Controller.getNowPlayingMovie)
router.get("/movies/popular", Controller.getPopularMovie)
router.get("/movies/top_rated", Controller.getTopRatedMovie)
router.get("/movies/upcoming", Controller.getUpcomingMovie)
router.get("/movie/search", Controller.getMovieSearch)
router.get("/movie/:id", Controller.getMovieDetail)

module.exports = router;