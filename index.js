const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');

require('dotenv').config();

const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
var path = require('path');

const routeAdmin = require("./routers/admin/index.route");
const routeClient = require("./routers/client/index.route");
const systemConfig = require("./config/system");


const database = require('./config/database');
database.connect();


const app = express();
const port = process.env.PORT;

//SocketIO
const server = createServer(app);

const { Server } = require('socket.io');
const io = new Server(server); // khởi tạo socket tổng bên phía server
global._io = io;


//end SocketIO

app.set("views",`${__dirname}/views`);
app.set("view engine","pug");


app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//Flash
app.use(cookieParser('afkdfj'));
app.use(session({cookie: { maxAge: 60000}}));
app.use(flash());

//method-override
app.use(methodOverride('_method'))

//App Local Variable

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.locals.prefixAdmin = systemConfig.prefixAdmin;



routeClient.index(app);
routeAdmin.index(app);

app.get("*", (req,res) => {
    res.render("client/pages/errors/404", {
        pageTitle:"Trang 404",
    })
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

