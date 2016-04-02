'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	MedicinaSchema = new Schema({
	nombreComercial: String,
	principioActivo: String,
	posologia: String,
	contraIndicaciones: String,
	inventario: String
});

module.exports = mongoose.model('Medicina', MedicinaSchema);


