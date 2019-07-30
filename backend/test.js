var assert = require('chai').assert;
var app = require('./index');
var app = require('./routes/users');
var app = require('./routes/course');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

console.log("inside test")
describe('get methods', function(){

    
    it('GET /quiz',function(){
        agent.get('/quiz/5ca802e712e6bf7f739000ac')

       // .send(book)
            .then(function(res){
                expect(res.body.count).to.equal(1);
            });
    });

    it('GET /assn',function(){
        agent.get('/assn/5cafea6f2986366e9d6da9a9')

       // .send(book)
            .then(function(res){
                expect(res.body.count).to.equal(1);
            });
    });
})
/*

it('POST /signin',function(){
    agent.post('/signin')
 
      
    send( {
        "user_email": "rakhee@gmail.com", 
        "user_password": "rakhee"
    })
       // .then(function(res){
           
            .expect(200)
         //   .expect('Content-Type', /json/)
            .expect(res.body.count).to.equal(1);
        });
});


*/

/*
let mongoose = require("mongoose");
//let Book = require('../app/models/book');

let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../server');
let should = chai.should();
var server = require('./routes/users');

chai.use(chaiHttp);

describe('/POST book', () => {
    it('it should not POST a book without pages field', (done) => {
        let book = {
            "user_email": "rakhee@gmail.com", 
            "user_password": "rakhee"
        }
      chai.request(server)
          .post('/signin')
          .send(book)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
             //   res.body.should.have.property('errors');
             //   res.body.errors.should.have.property('pages');
            //    res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});
*/
