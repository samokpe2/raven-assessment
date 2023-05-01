const accountModel = require('../../models/accounts');
const userService = require('../../services/v1/users');
const axios = require("axios");
const payload = require('../../helpers/payload');
const winston = require("winston");
const dotenv = require('dotenv');
dotenv.config()

async function create(user){

    const find =  await accountModel.find(user);
    if(find[0].length !== 0){
        let message = "This User has created an Account"
        let data = []
        let status = 409
        return payload.createPayload(message,status,data)
    }else{
        const currentUser = await userService.getUser(user);
        var space = currentUser.name.indexOf(" ");
        currentUser.first_name = currentUser.name.substring(0, space);
        currentUser.last_name = currentUser.name.substring(space + 1);
        currentUser.phone = currentUser.phonenumber;
        currentUser.amount = '0';
        
        let response = await axios.post(process.env.GENERATE_ACCOUNT,currentUser,{
            headers:{
                'Authorization':`Bearer ${process.env.PRIVATE_KEY}`
        }});
        
        const res = await accountModel.create(response.data.data, user);
        if(res){
            let message = "Account Created"
            let data = []
            let status = 200
            let response = await payload.createPayload(message,status,data) 
            return response;
        }
    }
}

module.exports = {create};