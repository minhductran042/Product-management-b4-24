const express = require('express');
const app = express();
const port = 3000;

const routeClient = require("./routers/client/index.route");

app.set("views","./views");
app.set("view engine","pug");

routeClient.index(app);

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});

