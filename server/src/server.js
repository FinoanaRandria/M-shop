const express = require("express");
const cors = require("cors");
const session = require('express-session');
const bodyparser = require("body-parser");
const authRoute = require("./routes/route.auth");
const routes = require('./routes/routes');
const produitRoute = require('./routes/route.produits')
require("dotenv").config();

const app = express();
const expressport = process.env.expressport || 3002;

app.use(session({
  key: "user",
  secret: "myscret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    /* expires: 60*60*24*7, */
  },
}));

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.static('uploads'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/file',express.static('./uploads'))
app.use(routes);
app.use("/api", authRoute);
app.use("/api/product",produitRoute)
app.listen(expressport, () => {
  console.log(`Server is running on port ${expressport}`);
});



