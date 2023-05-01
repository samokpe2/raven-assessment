const knex = require('../loaders/knex');
const bcrypt = require("bcrypt")

async function create(user){
    const {name, email, password, role} = user;
    let CURRENT_TIMESTAMP = new Date();
    let hash = await bcrypt.hash(password, 10);
    knex.raw('INSERT INTO users (name, email,phonenumber, password,role,created_at) VALUES (?, ?, ?, ?, ?)', [name, email,phonenumber,hash,role, CURRENT_TIMESTAMP])
    .then(function(response){
        return response;
    })
    return true;
}

//CURRENT_DATE
//9223372036854775

async function find(user){
    const {email} = user;
    return knex.raw(`SELECT * FROM users WHERE email = ?`, [email])
}

async function findById(user){
    const {id} = user;
    return knex.raw(`SELECT name,email,phonenumber FROM users WHERE id = ?`, [id])
}



module.exports = {create,find,findById}