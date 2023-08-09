const router = require('express').Router();
const Controller = require("../controllers");

router.get('/', (req, res) => {
    res.send('Hello!')
})

router.get("/popular/:group", Controller.getPopular)
router.get("/top_rated/:group", Controller.getTopRated)
router.get("/search/:group", Controller.getSearch)
router.get("/detail/:group/:id", Controller.getDetail)

module.exports = router;