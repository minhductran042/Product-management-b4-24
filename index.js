const express = require('express');

require('dotenv').config();

const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const routeAdmin = require("./routers/admin/index.route");
const routeClient = require("./routers/client/index.route");
const systemConfig = require("./config/system");


const database = require('./config/database');
database.connect();


const app = express();
const port = process.env.PORT;


app.set("views","./views");
app.set("view engine","pug");

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//Flash
app.use(cookieParser('afkdfj'));
app.use(session({cookie: { maxAge: 60000}}));
app.use(flash());

//App Local Variable

app.locals.prefixAdmin = systemConfig.prefixAdmin;


routeClient.index(app);
routeAdmin.index(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

