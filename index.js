const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;  //we select the port.Either the one provided by the server
//or 5000;


//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


//API key pk_03a5f0bfc5ce40c582d7e4cea26500da
//create call_api function

function call_api(finishedAPI, ticker) {

	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_03a5f0bfc5ce40c582d7e4cea26500da' , { json : true}, (err, res, body) => {

	if (err) {return console.log(err);}
	if (res.statusCode === 200)
	{
		//console.log(body);
		finishedAPI(body);
	};

});

};





//Set Handlebars Middleware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const barca = "We are pleased to have you on our page!";


//Set handlebar index GET route
app.get('/', function (req, res) {  //the '/' reffers to the homepage
	 call_api(function(doneAPI) {

	 		res.render('home' , {
	 		stock: doneAPI
	 		});

	 },"fb");
	
   
});


//Set handlebar index POST route
app.post('/', function (req, res) {  //the '/' reffers to the homepage
	 call_api(function(doneAPI) {
	 		//posted_stuff = req.body.stock_ticker;
	 		res.render('home' , {
	 		stock: doneAPI
	 		});

	 }, req.body.stock_ticker);
	
   
});




//Create "about" page route
app.get('/about.html', function (req, res) {  //the '/' reffers to the homepage
    res.render('about');
});




//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Server listening on port ' + PORT));
