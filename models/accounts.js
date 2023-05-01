const knex = require('../loaders/knex');

async function create(account,user){
    console.log(account);
    const {account_number, account_name, bank,isPermanent,amount} = account;
    const {id} = user;
    let CURRENT_TIMESTAMP = new Date();
    knex.raw('INSERT INTO accounts (account_number, account_name, bank,isPermanent,amount,user_id,created_at) VALUES (?, ?, ?, ?, ?, ?,?)', [account_number,account_name,bank,isPermanent,amount,id,CURRENT_TIMESTAMP])
    .then(function(response){
        return response;
    })
    return true;
}

//CURRENT_DATE
//9223372036854775
async function find(user){
    const {id} = user;
    return knex.raw(`SELECT * FROM accounts WHERE user_id = ?`, [id])
}



module.exports = {create,find}