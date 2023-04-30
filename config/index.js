const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    port: process.env.PORT,
    mysql:{
        user: process.env.MYSQL_USER,
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
    },
    jwtkey: process.env.JWT_SECRET_KEY,
    tokenkey: process.env.TOKEN_HEADER_KEY
}