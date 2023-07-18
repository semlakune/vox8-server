if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express')
const cors = require('cors')
const api = require("./api");
const {errorHandler} = require("./middlewares/errorHandlers");
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(api)
app.use(errorHandler)

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
// })

module.exports = app;