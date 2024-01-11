//Import the express package
const express = require('express');
const path = require('path');
const routes = require('./controllers');
//Import sequelize package
const sequelize = require('./config/connection');
// Importing handlebars 
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const session = require('express-session');

//Initialize the package
const app = express();

//Middleware for JSON and form data req and response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sessionVariable = {
     secret: 'Super secret secret',
     cookie: {
     maxAge: 24 * 60 * 60 * 1000,
     },
     resave: false,
     saveUninitialized: true,
};

app.use(session(sessionVariable));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Define the port
const PORT = process.env.PORT || 3001;

app.use(routes);
//Listen to the port
//sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
     });
//});