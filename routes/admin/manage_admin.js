const bcrypt = require('bcrypt');
const saltRounds = 10;
const database = require('../database_handling/connectionManager')

async function createHash(pass) {
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(pass, salt);
        return hash
    } catch (err) {
        console.log("CREATEHASH",err)
    }
}

async function checkHash(hash, pass) {
    try {
        return await bcrypt.compare(pass, hash);
    } catch (err) {
        console.log("CHECKHASH",err)
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let adminSessions = []

let Admin = {
    create : (username, password, admin) => {
        createHash(password).then(pass => {
            database.run(`INSERT INTO "Users" VALUES(${getRandomInt(2147483647)}, $1, $2, $3);`, [username, pass, admin])
        })
    },
    loggedIn : async (token) => {
        console.log(token)
        if(token){
            let sesh = adminSessions.filter(session => session.token == token)[0]
            console.log(sesh)
            if(sesh.token == token){
            console.log(token)
            return [true, token]
            }
            else{
            console.log("nopessss")
            return [false, 0]
            }
        }
    },
    login : async (uname, pass, token) => {
        return new Promise((resolve, reject)=>{
            database.rows(`SELECT * FROM "Users" WHERE "UName" = $1`, [uname]).then(admin => {
                admin = admin[0]
                if(typeof myVar !== 'undefined'){
                    checkHash(admin.PassHash, pass).then(hash => {
                        if(uname == admin.UName && hash){
                            let time = new Date().getTime()
                            adminSessions.push({user: admin.UName, token: token, time: time})
                            console.log("login success")
                            resolve(true)
                        }
                        else{
                            console.log("login failure")
                            resolve(false)
                        } 
                    })
                }
                else resolve(false)
            })
        });
    },
    update : (token, action, data) => {
        user = adminSessions.find(user => user.token === token).uname;
    },
    payment : {
        capture : (token, data) => {

        },
        refund : (token, data) => {

        }
    }
}

module.exports = Admin;

setInterval(()=>{
    adminSessions = adminSessions.filter(session => session.time < new Date().getTime() + 3600000) // if session smaller than 1h old
}, 60000)

//cmds.admin.create("n", '123', true)

//cmds.admin.login("n.v22", 'L3moonSqueez1')