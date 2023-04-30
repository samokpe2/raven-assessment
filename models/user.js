const knex = require('../loaders/knex');
const bcrypt = require("bcrypt")

async function create(user){
    const {name, email, password, role} = user;
    let CURRENT_TIMESTAMP = new Date();
    let hash = await bcrypt.hash(password, 10);
    knex.raw('INSERT INTO users (name, email, password,role,created_at) VALUES (?, ?, ?, ?, ?)', [name, email,hash,role, CURRENT_TIMESTAMP])
    .then(function(response){
        return response;
    })
    return true;
}

async function update(user){
    const {id, name, email,} = user;

    knex.raw(`UPDATE users SET name = ?, email = ? where id = ?`, [name, phone, email,id], (error) => {
        if (error) {
          winston.error(error.stack)
          return false;
        } 
    })
    return true;
}

//CURRENT_DATE
//9223372036854775

async function find(user){
    const {email} = user;
    return knex.raw(`SELECT * FROM users WHERE email = ?`, [email])
}



module.exports = {create,find,update}