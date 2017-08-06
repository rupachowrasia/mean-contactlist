var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

/**
 * Get method to get all contacts.
 *
 * @since 1.0.0
 */	
app.get('/contactlist', function(req, res){
	db.contactlist.find(function(error, doc){
		res.json(doc);
	});
});

/**
 * Post method to add the contact.
 *
 * @since 1.0.0
 */	
app.post('/contactlist', function(req,res){
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

/**
 * Delete method to delete the contact.
 *
 * @since 1.0.0
 */	
app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

/**
 * Get method to get a contact based on the id provided.
 *
 * @since 1.0.0
 */	
app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

/**
 * Put method to update the contact.
 *
 * @since 1.0.0
 */	
app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findAndModify({query:{_id: mongojs.ObjectId(id)},
		update: {$set: {name:req.body.name, email:req.body.email, number:req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
		});
});

// sample static data to populate from server, if mongodb is not connected
/*app.get('/contactlist', function(req, res){
	person1 = {
		name: 'tester1',
		email: 'tester1@gmail.com',
		number: '(111)-111-1111'
	};

	person2 = {
		name: 'tester2',
		email: 'tester2@gmail.com',
		number: '(222)-222-2222'
	};

	person3 = {
		name: 'tester3',
		email: 'tester3@gmail.com',
		number: '(333)-333-3333'
	};
	var contactList = [person1, person2, person3];
	res.json(contactList);
});*/

app.listen(3000);
console.log('Yay, server is running!!');