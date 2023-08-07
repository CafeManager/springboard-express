
const express = require('express')
const itemsRoutes = require('./routes/items')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/items", itemsRoutes)



app.use((err, req, res, next) => {
    res.status(err.status || 500)

    return res.json({
        error: err.message
    })
})

app.use(function (err, req, res, next){
    let status = err.status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    })
})
module.exports = app;