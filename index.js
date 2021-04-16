const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path');

//Call me when you want

const PORT = process.env.PORT || 5000;  //we select the port.Either the one provided by the server
//or 5000;

//Set Handlebars Midware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const barca = "Visca el Barca";


//Set handlebar routes
app.get('/', function (req, res) {  //the '/' reffers to the homepage
    res.render('home', {

    	fun: barca
    });
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Server listening on port ' + PORT));
