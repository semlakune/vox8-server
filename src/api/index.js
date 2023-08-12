const router = require('express').Router();
const Controller = require("../controllers");

router.get('/', (req, res) => {
    res.send('Hello!')
})

router.get("/getDominantColor", Controller.getDominantColor)
router.get("/trending/all/:time", Controller.getTrending)
router.get("/popular/:group", Controller.getPopular)
router.get("/top_rated/:group", Controller.getTopRated)
router.get("/search/:group", Controller.getSearch)
router.get("/detail/:group/:id", Controller.getDetail)
router.get("/detail/:group/:id/similar", Controller.getSimilar)

module.exports = router;