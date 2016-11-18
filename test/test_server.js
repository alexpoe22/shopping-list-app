var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

beforeEach(function() {
	storage.setId = 4;
	storage.items = [
		{ id: 1, name: 'Broad beans' },
		{ id: 2, name: 'Tomatoes' },
		{ id: 3, name: 'Peppers' } 
	]
});

describe('Shopping', function() {
	it('should initialize storage with three items', function() {
		storage.items.should.have.length(3);
	});

	it('should add an item on post', function(done) {
		chai.request(app)
			.post('/items')
			.end(function(err, res) {
				res.should.have.status(201);
				done();
			});

	});

	it('should change an item on put', function(done){
		chai.request(app)
		.put('/items/3')
		.send({name:'Alex'})
		.end(function(err, res){
			console.log(storage.items);
			res.should.have.status(200);	
			done();
		});
	});

	it('should list items on get', function(done){
        chai.request(app)
        .get('/items')
        .end(function(err, res){
        	should.equal(err, null);
        	res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.have.length(3);
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('name');
            res.body[0].id.should.be.a('number');
            res.body[0].name.should.be.a('string');
            res.body[0].name.should.equal('Broad beans');
            res.body[1].name.should.equal('Tomatoes');
            res.body[2].name.should.equal('Peppers');
            done();
        });
    });

	it('should delete an item on delete', function(done){
        chai.request(app)
        .delete('/items/1')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        })
    });

});

// app.listen(process.env.PORT || 8080);