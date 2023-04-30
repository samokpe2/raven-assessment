let chai = require('chai');
const { expect } = require("chai");
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
// describe('/POST book', () => {
//     it('it should GET all the books', (done) => {
//       chai.request(server)
//           .get('/book')
//           .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 res.body.length.should.be.eql(0);
//             done();
//           });
//     });
// });
var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
var number = '123456789'
var string = '';
var pass = '';
var phone = '';

for(var i=0; i<8; i++){
    string += chars[Math.floor(Math.random() * chars.length)];
}
for(var i=0; i<8; i++){
    pass += chars[Math.floor(Math.random() * chars.length)];
}
for(var i=0; i<8; i++){
    phone += number[Math.floor(Math.random() * number.length)];
}

let user = {
    name : "John Doe",
    email: string + '@gmail.com',
    password: pass,
    phone: phone
}

describe('/POST user login', () => {
    it('it should not login that has not been registered', (done) => {
        
      chai.request(server)
          .post('/api/v1/user/login')
          .send(user)
          .end((err, res) => {
                expect(res).to.have.status(409)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message').eql('This email has not been registered')
                expect(res.body).to.have.property('data').eql([])
                expect(res.body).to.have.property('status').eql(409)
            done();
          });
    });
});


describe('/POST user', () => {
    it('it should create a new user', (done) => {
        
      chai.request(server)
          .post('/api/v1/user')
          .send(user)
          .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message').eql('Registration Successful')
                expect(res.body).to.have.property('data').eql([])
                expect(res.body).to.have.property('status').eql(200)
            done();
          });
    });

    it('it should not create a new user with the same credentials', (done) => {
        
        chai.request(server)
            .post('/api/v1/user')
            .send(user)
            .end((err, res) => {
                  expect(res).to.have.status(409)
                  expect(res.body).to.be.a('object')
                  expect(res.body).to.have.property('message').eql('The Email or Phone has been used before')
                  expect(res.body).to.have.property('data').eql([])
                  expect(res.body).to.have.property('status').eql(409)
              done();
            });
      });

});

describe('/POST user login', () => {
    it('it should allow user to login', (done) => {
        
      chai.request(server)
          .post('/api/v1/user/login')
          .send(user)
          .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message').eql('Login Successfully')
                expect(res.body).to.have.property('data').to.have.property('token')
                expect(res.body).to.have.property('status').eql(200)
            done();
          });
    });

    let newUser = {
        name : "John Doe",
        email: string + '@gmail.com',
        password: "HIIIIIIIIII",
        phone: phone
    }

    it('it should not allow user to login', (done) => {
        
        chai.request(server)
            .post('/api/v1/user/login')
            .send(newUser)
            .end((err, res) => {
                  expect(res).to.have.status(401)
                  expect(res.body).to.be.a('object')
                  expect(res.body).to.have.property('message').eql('Password Incorrect')
                  expect(res.body).to.have.property('data').eql([])
                  expect(res.body).to.have.property('status').eql(401)
              done();
            });
      });
});