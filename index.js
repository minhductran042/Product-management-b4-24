const express = require('express');

require('dotenv').config();

const routeAdmin = require("./routers/admin/index.route");
const routeClient = require("./routers/client/index.route");

const database = require('./config/database');
database.connect();


const app = express();
const port = process.env.PORT;


app.set("views","./views");
app.set("view engine","pug");

app.use(express.static('public'));

routeClient.index(app);
routeAdmin.index(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

