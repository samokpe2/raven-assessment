const AccessControl = require('accesscontrol');

const ac = new AccessControl()

ac.grant("User")
    .readAny("category")
    .readAny("audio")
    .createAny("review")
    .readAny("review")
    .grant("Admin")
    .extend("User")
    .createAny("category")
    .createAny("audio")



module.exports = ac

