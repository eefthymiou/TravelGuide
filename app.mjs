import express from 'express'
import { engine } from 'express-handlebars'
import { router } from './routes.mjs'
import mongoose from 'mongoose'
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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Η εφαρμογή ξεκίνησε στο http://127.0.0.1:${PORT}`))


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Successfull connection");
});
