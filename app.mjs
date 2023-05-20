import express from 'express'
import { engine } from 'express-handlebars'
import { router } from './routes.mjs'
import bodyparser from 'body-parser'



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



// sessions
import expSession from 'express-session';

const sessionConf = {
   secret: 'έναμεγάλοτυχαίοαλφαριθμητικό',
   cookie: { maxAge: 10 * 60 * 1000 },  //10 min
   resave: false,
   saveUninitialized: false,
};

app.use(expSession(sessionConf));

app.get("/", function (req, res) {
   // console.log(req.headers)
   if (req.session.mySessionName == undefined) {
       console.log("not logged in")
   }
   else {
       console.log("is logged in")
   }
})

// app.get("/login", (req, res) => {
//    // Ελέγχουμε αν υπάρχει η μεταβλητή συνεδρίας με όνομα mySessionName και αν δεν υπάρχει την δημιουργούμε
//    if (req.session.mySessionName == undefined) {
//        req.session.mySessionName = 'gk802-session'
//        console.log("session started:", req.session)
//        res.send("Successfully logged in, go to <a href='/'>home page</a> or visit <a href='/session'>session</a> to view session data")
//    }
//    else {
//        res.send("Already logged in, go to <a href='/'>home page</a>")
//    }
// })

// app.get("/logout", (req, res) => {
//    // δεν είμαστε συνδεδεμένοι, δε χρειάζεται να κάνουμε κάτι
//    if (req.session.mySessionName == undefined) {
//        res.redirect("/")
//    }
//    // καταστρέφουμε τις πληροφορίες συνεδρίας στον server (στο session store του server)
//    else {
//        req.session.destroy((err) => { console.log("session destroyed") })
//        res.send("Successfully logged out, go to <a href='/'>home page</a>")
//    }
// })

app.use(bodyparser.urlencoded({ extended: true }))


export { app };
