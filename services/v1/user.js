const userModel = require('../../models/user');
const payload = require('../../helpers/payload');
const tokengen = require('../../helpers/tokengen');
const bcrypt = require("bcrypt")
const _ = require('lodash');
const winston = require("winston");

async function create(user){
    const find =  await userModel.find(user);
    if(find[0].length !== 0){
        let message = "The Email or Phone has been used before"
        let data = []
        let status = 409
        return payload.createPayload(message,status,data)
    }else{
        const res = await userModel.create(user)
        if(res){
            winston.info(`${user.email} registered at ${new Date()}`)
            let message = "Registration Successful"
            let data = []
            let status = 200
            let response = await payload.createPayload(message,status,data) 
            return response;
        }
    }
}

async function login(user){

    user.phone = ""
    const {email,password} = user;
    const find = await userModel.find(user);
    
    if(find[0].length !== 1){
        let message = "This email has not been registered"
        let data = []
        let status = 409
        return payload.createPayload(message,status,data)
    }else{
        let rows  =  find[0];
        let passwordCheck = await bcrypt.compare(password, rows[0].password);
        if(passwordCheck){
            winston.info(`${email} logged in at ${new Date()}`)
            let userData = _.pick(rows[0],['id','email','phone','name','role'])
            let token = tokengen.generate(userData)
            let message = "Login Successfully"
            let data = {'token':token}
            let status = 200
            return payload.createPayload(message,status,data)
        }else{
            let message = "Password Incorrect"
            let data = []
            let status = 401
            return payload.createPayload(message,status,data)
        }
    }
}

module.exports = {create,login};