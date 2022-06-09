const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 1994;
const route = require('./routes');
const db = require('./config/db/');

//connect to database
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

//[POST] middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//http log
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
