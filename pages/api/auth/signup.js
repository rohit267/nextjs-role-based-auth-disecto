import crypto from "crypto";
import User from '../../../models/User';
import Cookie from "cookies";
import jwt from "jsonwebtoken";
import db from '../../../controller/db';
const config = require('../../../configs');

function signup(req,res){
    console.log(req.body);
    const { username, password, isAdmin } = req.body;
    const cookies = new Cookie(req, res);
    if (!username || !password || isAdmin === undefined) {
        return res.status(200).json({
            error: 'Please include a username and password'
        });
    }

    if (!username.match(/^[a-zA-Z0-9]{4,10}$/)) {
        return res.status(200).json({
            error: 'Username must be between 4 and 10 characters and can only contain letters and numbers'
        });
    }

    if (!password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)) {
        return res.status(200).json({
            error: 'Password must contain at least one alphabet, one number, and one special character'
        });
    }

    try{
        db();
        User.find({username: username}, (err, docs) => {
            if (docs.length > 0) {
                return res.status(200).json({
                    error: 'Username already taken'
                });
            }
            const encryptedPassword = crypto.createHmac('sha256', config.PASSWORD_SECRET)
                .update(password)
                .digest('hex');
            const user = new User({
                username: username,
                password: encryptedPassword,
                isAdmin: isAdmin
            });

            user.save((err) => {
                console.log(err);
                if (err) {
                    return res.status(500).json({
                        error: 'Something went wrong'
                    });
                }
                const token = jwt.sign({
                    username: username,
                    isAdmin: isAdmin
                }, config.JWT_SECRET, { expiresIn: '2h' });
                cookies.set('token', token, { httpOnly: true , expires: new Date(Date.now() + 2 * 3600000)});
                return res.json({
                    message: 'User created successfully and logged in',
                });
            });
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Something went wrong'
        });
    }
}

export default db(signup);
