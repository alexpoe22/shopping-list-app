var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);


describe('Shopping', function() {
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
		.end(function(err, res){
			res.should.have.status(200);	
			done();
		});
	});

	it('should list items on get', function(done){
        chai.request(app)
        .get('/items')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        })
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