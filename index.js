const express = require('express');
const routes = require('./routes/api');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(function(err, req, res, next){
	console.log({error: err.message});
});
app.listen(process.env.PORT || 4000, function(){
	console.log('Esperando por request puerto 4000');
});
