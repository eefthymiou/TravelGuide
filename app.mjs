import express from 'express'
import { engine } from 'express-handlebars'
import { router } from './routes.mjs'
// import bodyparser from 'body-parser'
import session from 'express-session';
import 'dotenv/config'
import createMemoryStore from 'memorystore'
import fileUpload from 'express-fileupload'

const MemoryStore = createMemoryStore(session)

const sessionConf = {
   secret: process.env.SESSION_SECRET,
   store: new MemoryStore({ checkPeriod: 86400000 }),
   cookie: { maxAge: 10 * 60 * 1000 },  //10 min
   resave: false,
   saveUninitialized: true,
};


const app = express()

app.use(fileUpload());

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(session(sessionConf));

app.engine('hbs', engine({ extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use("/", router)

app.use((req, res) => {
    res.redirect("/mainpage")
})

// app.use(bodyparser.urlencoded({ extended: true }))

export { app };
