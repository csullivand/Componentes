'use strict';

// server.js (Express 4.0)

// BASE SETUP
// ==============================================

// call the packages we need
let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/test',
		port = process.env.PORT || 8080;

// connect to mongodb
mongoose.connect(dbURI);

// 

let Medicina=require('./api/models/medicina')


// DEFINE THE MIDDLEWARE FOR APP
// ==============================================

// configure app to use bodyParser()
// this will let us get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES
// ==============================================

// get an instance of the express router
let apiRouter = express.Router();

// test router
// apiRouter.get('/', (req, res) => {
// 	res.json({ message: 'welcome to out api' });
// });

// MIDDLEWARE to use for all requests
apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();   // don't stop here, go to next route
});

// routes 
// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});




// routes -medicina
// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

// on routes that end in /medicina
apiRouter.route('/medicina')
	// create a medecine (http://localhost:8080/api/medicina)
	.post((req, res) => {
			let medicina = new Medicina();
			medicina.nombreComercial = req.body.nombreComercial;
			medicina.principioActivo = req.body.principioActivo;
			medicina.posologia = req.body.posologia;
			medicina.contraIndicaciones = req.body.contraIndicaciones;
			medicina.inventario = req.body.inventario;

			medicina.save(err => {
					if (err) res.send(err);
						res.json({ message: 'Medicina agregada!' });
					});
		})
	// get all medicines (http://localhost:8080/api/medician)
		.get((req, res) => {
			Medicina.find((err, medicina) => {
					if (err) res.send(err);
					res.json(medicina);
			});
		});

// medicines aprox search
apiRouter.route('/medicina/nombreComercial/query')
	.get((req,res)=> {
		let nombreMedicinaString = req.query.nombreComercial;
		Medicina.find({"nombreComercial":{"$regex":nombreMedicinaString}},(err,medicina) => {
			if (err) res.send(err);
			res.json(medicina);
		})
	});

apiRouter.route('/medicina/principioActivo/query')
	.get((req,res)=> {
		let principioActivoString = req.query.principioActivo;
		Medicina.find({"principioActivo":{"$regex": principioActivoString}},(err,medicina) => {
			if (err) res.send(err);
		    res.json(medicina);
		})
	});

apiRouter.route('/medicina/:medicina_id')
// update a movie by id (http://localhost:8080/api/medicina/:medicina_id)
	.put((req, res) => {
	Medicina.findById(req.params.medicina_id, (err, medicina) => {
	if (err) res.send(err);
// update info
		medicina.nombreComercial = req.body.nombreComercial;
		medicina.pricipioActico = req.body.pricipioActico;
		medicina.posologia = req.body.posologia;
		medicina.contraIndicaciones = req.body.contraIndicaciones;
		medicina.inventario = req.body.inventario;
// save medicina
movie.save(err => {
	if (err) res.send(err);
res.json({ message: 'Medicamento actualizado!' });
});
});
})



// register our routes
// all routes will be prefixed with /api
app.use('/api', apiRouter);



// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
