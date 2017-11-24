const express = require('express');
const router = express.Router();
const pg = require('pg');
const conString = process.env.DATABASE_URL || 'postgres://martin:123@localhost:5432/Facturacion';
const client = new pg.Client(conString);
const comilla = String.fromCharCode(39);

client.connect();

router.get('/empresa/:id', function(req, res, next) {
	var results = {};
	//var query = client.query('SELECT * FROM public.empresa WHERE id = ' + req.params.id, 
	var query = client.query('SELECT * FROM public.empresa', 
			function(err, result) {
        if(err) {return console.error(err);}
         results.empresa = result.rows;
         return res.json(results);
    });
});

router.post('/empresa', function(req, res , next) {
	var regimencontributivo = comilla + req.body.regimencontributivo + comilla;
	var pais = comilla + req.body.pais + comilla;
	var departamento = comilla + req.body.departamento + comilla;
	var ciudad = comilla + req.body.ciudad + comilla;
	var nit = comilla + req.body.nit + comilla;
	var nombrecomercial = comilla + req.body.nombrecomercial + comilla;
	var idrepresentantelegal = comilla + req.body.idrepresentantelegal + comilla;
	var nombrerepresentantelegal = comilla + req.body.nombrerepresentantelegal + comilla;
	var nombreregistro = comilla + req.body.nombreregistro + comilla;
	var logo = comilla + req.body.logo + comilla;
	var direccion = comilla + req.body.direccion + comilla;
	var telefono = comilla + req.body.telefono + comilla;
	var resoluciondian = comilla + req.body.resoluciondian + comilla;
	var queryInsertEmpresa = client.query('INSERT INTO public.empresa('
			+ 'regimencontributivo, pais, departamento, ciudad, nit,' 
		    + 'nombrecomercial, idrepresentantelegal, nombrerepresentantelegal,' 
		    + 'nombreregistro, logo, direccion, telefono, resoluciondian) VALUES ('
		    + regimencontributivo + ',' + pais + ',' + departamento + ',' + ciudad + ',' + nit 
		    + ',' + nombrecomercial + ',' + idrepresentantelegal + ',' + nombrerepresentantelegal
		    + ',' + nombreregistro + ',' + logo + ',' + direccion + ',' + telefono + ',' + resoluciondian + ')'
		    ).then (function(data){
			console.log("Success");	
			}).catch(next);
});

router.get('/empresa', function(req, res, next) {
	var results = {};
	var query = client.query('SELECT last_value FROM emp_ser_seq', 
			function(err, result) {
        if(err) {return console.error(err);}
         return res.json(result.rows);
    });
});

router.put('/rLegal/:id/:name', function(req, res, next) {
	res.send({type:'PUT'});
	console.log(req.params.id);
	console.log(req.params.name);
	
});

router.delete('/empresa/:id', function(req, res, next) {
	res.send({type:'DELETE'});
	const id = req.params.id;
	const queryDelete = client.query(
			'DELETE FROM public.empresa WHERE ID =' 
			+ id).then (function(data){
			console.log("Success");	
			}).catch(next);
});

router.post('/usuario', function(req, res, next) {
	var usuario = comilla + req.body.usuario + comilla;
	var clave = comilla + req.body.clave + comilla;
	var serialempresa = req.body.serialempresa;
	var queryInsertEmpresa = client.query(
			'INSERT INTO public.usuarios(usuario, clave, serialempresa)'
			+ 'VALUES(' + usuario + ',' + clave + ',' + serialempresa + ')'
			).then (function(data){
			console.log("Success");	
			}).catch(next); 
});

router.get('/usuario', function(req, res, next) {
	var results = {};
	var query = client.query('SELECT * FROM public.usuarios', 
			function(err, result) {
        if(err) {return console.error(err);}
         results.usuarios = result.rows;
         return res.json(results);
    });
});


module.exports = router;
