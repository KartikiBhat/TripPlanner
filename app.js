const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('morgan')('dev'));
app.use(require('cookie-parser')());

app.get('/',(req,res,next)=>{
	res.redirect('/');
})

app.use('/api',require('./routes/api'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({'errors': {
	  message: err.message,
	  error: {}
	}});
  });

app.listen(PORT, (req,res)=>{
	console.log(`Listening on port ${PORT}`);
})
