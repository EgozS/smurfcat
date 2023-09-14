const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.get('/', (req, res) => {
    if(session.logged) {
        res.render('index', {err: ""});
    }
    else {
        res.render('index', {err: "enter phrase first"});
    }
    return
});

app.get('/we-live-we-love-we-lie', (req, res) => {
    if(session.logged) {
        res.render('smurfcat');
    }
    else {
        res.redirect('/');
    }
});

app.post('/check-phrase', (req, res) => {
    const phrase = req.body.phrase;
    if(phrase != "we live we love we lie") {
        res.render('index', {err : "Wrong phrase"});
    }
    else
    {
        session.logged = true;
        res.redirect('/we-live-we-love-we-lie');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});