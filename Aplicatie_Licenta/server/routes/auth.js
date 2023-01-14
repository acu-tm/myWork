const { connect } = require('getstream');
const express = require('express');

const crypto = require('crypto');
const bcrypt = require('bcrypt');

const StreamChat = require('stream-chat').StreamChat;


//const { signup, login } = require('../controllers/auth.js');

require('../lib_server/generateKeys');
require('dotenv').config();

const app_key = process.env.STREAM_APP_KEY;
const app_secret = process.env.STREAM_APP_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup_function = async (req, res) => {
    try {
        const { department, employeeName, password, employeePhone } = req.body;
        const serverClient = connect(app_key, app_secret, app_id);

        const employeeID = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(employeeID);

        res.status(222).json({ token, department, employeeName, employeeID, hashedPassword, employeePhone });

    } catch (error) {
        console.log(error);

        res.status(555).json({ notification: error });
    }
};

const login_function = async (req, res) => {
    try {
        const { employeeName, password } = req.body;
        
        const serverClient = connect(app_key, app_secret, app_id);
        const client = StreamChat.getInstance(app_key, app_secret);
        
        const { users } = await client.queryUsers({ name: employeeName });
        if(!users.length)
            return res.status(333).json({ notification: 'User not exist' });

        const passwordCorrect = await bcrypt.compare(password, users[0].hashedPassword);
        const token = serverClient.createUserToken(users[0].id);

        if(passwordCorrect) {
            res.status(222).json({ token, department: users[0].department, employeeName, employeeID: users[0].id});
        } else {
            res.status(555).json({ notification: 'Wrong Password' });
        }
    } catch (error) {
        console.log(error);

        res.status(555).json({ notification: error });
    }
};

const router = express.Router();
//using post routes to send data from front end to backend
router.post('/signup', signup_function);
router.post('/login', login_function);

module.exports = router;