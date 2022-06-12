const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const morgan = require('morgan');
const methodOverride = require('method-override');
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

app.use(methodOverride('_method'));

app.use(SortMiddleware);

//http log
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span></a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
