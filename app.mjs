import express from 'express'
import { engine } from 'express-handlebars'
import { router } from './routes.mjs'
import 'dotenv/config'

const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.engine('hbs', engine({ extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use("/", router)

app.use((req, res) => {
    res.redirect("/mainpage")
})

export { app };