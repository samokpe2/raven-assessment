const pool = require('../../loaders/postgres');
const bcrypt = require("bcrypt")

async function create(user){
    const {name, phone, email, password, role} = user;
    let hash = await bcrypt.hash(password, 10);
    pool.query(`INSERT INTO "user" (name, phone, email, password,role) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, phone, email,hash,role], (error) => {
        if (error) {
          winston.error(error.stack)
          return false;
        } 
    })
    return true;
}

async function update(user){
    const {id, name, phone, email,} = user;

    pool.query(`UPDATE "user" SET name = #1,  phone = $2, email = $3 where id = $4`, [name, phone, email,id], (error) => {
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
    const {email, phone} = user;
    return pool.query(`SELECT * FROM "user" WHERE email = $1 OR phone = $2`, [email,phone])
}



module.exports = {create,find,update}